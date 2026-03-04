<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

definePageMeta({
    layout: 'dashboard',
});

// 1. Define Validation Schema
const profileSchema = toTypedSchema(
    z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        bio: z.string().max(160).optional(),
    })
);

// 2. Mock User Data (Replace with your useQuery data)
const { data: user } = {
    data: {
        name: 'John Doe',
        email: 'john@example.com',
        isEmailVerified: true,
        profilePicture: 'https://github.com/shadcn.png',
    },
};

const form = useForm({
    validationSchema: profileSchema,
    initialValues: {
        name: user?.name,
        email: user?.email,
        bio: '',
    },
});

const onSubmit = form.handleSubmit((values) => {
    console.log('Form Submitted:', values);
    // Use your $api factory to send update request here
});
</script>
<template>
    <div class="w-full py-10">
        <Card class="w-full">
            <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                    Update your personal information and public profile.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form @submit="onSubmit" class="space-y-6">
                    <div
                        class="flex items-center gap-x-6 pb-6 border-b border-border"
                    >
                        <Avatar class="h-20 w-20">
                            <AvatarImage
                                :src="user?.profilePicture"
                                alt="User Avatar"
                            />
                            <AvatarFallback>{{
                                user?.name?.charAt(0)
                            }}</AvatarFallback>
                        </Avatar>
                        <div class="space-y-1">
                            <Button variant="outline" size="sm" type="button"
                                >Change Avatar</Button
                            >
                            <p class="text-xs text-muted-foreground">
                                JPG, GIF or PNG. Max size of 2MB.
                            </p>
                        </div>
                    </div>

                    <div class="grid gap-4">
                        <FormField v-slot="{ componentField }" name="name">
                            <FormItem>
                                <FormLabel>Display Name</FormLabel>
                                <FormControl>
                                    <Input v-bind="componentField" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem>
                                <div class="flex items-center justify-between">
                                    <FormLabel>Email Address</FormLabel>
                                    <Badge
                                        v-if="user?.isEmailVerified"
                                        variant="secondary"
                                        class="bg-green-100 text-green-700 hover:bg-green-100"
                                    >
                                        Verified
                                    </Badge>
                                </div>
                                <FormControl>
                                    <Input v-bind="componentField" disabled />
                                </FormControl>
                                <FormDescription
                                    >Your email is managed via Google
                                    Auth.</FormDescription
                                >
                                <FormMessage />
                            </FormItem>
                        </FormField>

                        <FormField v-slot="{ componentField }" name="bio">
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        v-bind="componentField"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </div>

                    <div class="flex justify-end gap-3 pt-4">
                        <Button variant="ghost" type="button">Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
<style lang="scss" scoped></style>
