<script lang="ts" setup>
import { useForm } from 'vee-validate';
import {
    Loader2Icon,
    MessageCircleWarningIcon,
    type Loader2,
} from 'lucide-vue-next';
import { ProfileUpdateSchema, type TProfileUpdate } from '../user.validation';
import UiInput from '~/components/shared/UiInput.vue';
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

const authStore = useAuthStore();

// You can use these directly in the template
const { user, isLoading } = storeToRefs(authStore);

const { $api } = useNuxtApp();

// 1. Image Upload & Preview State
const fileInput = ref<HTMLInputElement | null>(null);
const previewImage = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

// 2. Form Setup
const { handleSubmit, setValues } = useForm({
    validationSchema: ProfileUpdateSchema,
    initialValues: {
        name: user.value?.user?.name || '',
        email: user.value?.user?.email || '',
        bio: user.value?.user?.bio || '',
    },
});

// 3. Mutation Setup (Using FormData for Image Support)
const { mutate, isPending } = useMutation({
    mutationFn: (dataProfile: FormData) => $api.user.updateProfile(dataProfile),
    onSuccess: async (data) => {
        toast.success('Profile Updated Successfully');
        previewImage.value = null;
        selectedFile.value = null;

        await authStore.fetchUser();
    },
    onError: (err: any) => {
        const msg =
            err.response?._data?.message || 'Update failed. Please try again.';
        toast.error(msg);
    },
});

// Sync data if user loads late
watch(
    user,
    (newUser) => {
        if (newUser?.user) {
            setValues({
                name: newUser.user.name,
                email: newUser.user.email,
                bio: newUser.user.bio,
            });
        }
    },
    { immediate: true }
);

// Handle file selection
const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
        // Validate file size (2MB)
        if (file.size > 2 * 1024 * 1024) {
            toast.error('File is too large. Max 2MB.');
            return;
        }
        selectedFile.value = file;
        previewImage.value = URL.createObjectURL(file);
    }
};

const onSubmit = handleSubmit((values) => {
    const formData = new FormData();
    formData.append('name', values.name || '');
    formData.append('email', values.email || '');
    formData.append('bio', values.bio || '');

    if (selectedFile.value) {
        formData.append('profilePicture', selectedFile.value);
    }

    // Just call mutate. onSuccess handles the rest.
    mutate(formData);
});
</script>

<template>
    <div class="w-full py-10 px-4">
        <Card class="w-full max-w-4xl mx-auto shadow-sm">
            <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                    Update your personal information and public profile.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form @submit="onSubmit" class="space-y-6">
                    <div
                        class="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b"
                    >
                        <Avatar class="h-24 w-24 border-2 border-primary/10">
                            <AvatarImage
                                :src="
                                    previewImage ||
                                    user?.user?.profilePicture ||
                                    '/user_profile.png'
                                "
                                class="object-cover"
                            />
                            <AvatarFallback class="text-xl">{{
                                user?.user?.name?.charAt(0)
                            }}</AvatarFallback>
                        </Avatar>

                        <div class="space-y-2 text-center sm:text-left">
                            <input
                                type="file"
                                ref="fileInput"
                                class="hidden"
                                accept="image/*"
                                @change="onFileChange"
                            />
                            <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                :disabled="isPending"
                                @click="fileInput?.click()"
                            >
                                {{
                                    selectedFile
                                        ? 'Change Selected'
                                        : 'Change Avatar'
                                }}
                            </Button>
                            <p
                                class="text-[11px] text-muted-foreground leading-relaxed max-w-[200px]"
                            >
                                JPG, GIF or PNG. Max size 2MB. 1:1 aspect ratio
                                recommended.
                            </p>
                        </div>
                    </div>

                    <div class="grid gap-6">
                        <UiInput
                            name="name"
                            label="Display Name"
                            placeholder="Enter your name"
                            :disabled="isPending"
                        />

                        <div class="flex flex-col space-y-2">
                            <div class="flex items-center justify-between">
                                <label class="text-sm font-medium"
                                    >Email Address</label
                                >
                                <Badge
                                    v-if="user?.user?.isEmailVerified"
                                    class="bg-green-500/10 text-green-600 border-green-200/50"
                                >
                                    Verified
                                </Badge>
                                <Badge
                                    v-else
                                    variant="destructive"
                                    class="gap-1 px-2"
                                >
                                    <MessageCircleWarningIcon :size="12" /> Not
                                    Verified
                                </Badge>
                            </div>
                            <UiInput name="email" type="email" readonly />
                        </div>

                        <FormField v-slot="{ componentField }" name="bio">
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us about yourself..."
                                        v-bind="componentField"
                                        :disabled="isPending"
                                        class="min-h-[100px] resize-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div class="flex justify-end gap-3 pt-4">
                        <Button
                            variant="ghost"
                            type="button"
                            :disabled="isPending"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            :disabled="isPending"
                            class="relative min-w-[140px]"
                        >
                            <Loader2Icon
                                v-if="isPending"
                                class="h-4 w-4 animate-spin"
                            />

                            <span>
                                {{ isPending ? 'Saving...' : 'Save Changes' }}
                            </span>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
