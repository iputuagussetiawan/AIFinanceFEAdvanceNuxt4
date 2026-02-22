<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import GoogleIcon from '../shared/icons/GoogleIcon.vue';
const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();

const formSchema = toTypedSchema(
    z.object({
        fullName: z.string().min(2, 'Name is too short').max(50),
        email: z.string().email('Invalid email address'),
    })
);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
    console.log('🌱 Form submitted!', values);
});
</script>

<template>
    <form :class="cn('flex flex-col gap-6', props.class)" @submit="onSubmit">
        <FieldGroup>
            <div class="flex flex-col items-center gap-1 text-center">
                <h1 class="text-2xl font-bold">Create your account</h1>
                <p class="text-muted-foreground text-sm text-balance">
                    Fill in the form below to create your account
                </p>
            </div>
            <FormField v-slot="{ componentField }" name="fullName">
                <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            placeholder="Full Name"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                            type="email"
                            placeholder="Email"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Field>
                <Button type="submit"> Create Account </Button>
            </Field>
            <FieldSeparator>Or continue with</FieldSeparator>
            <Field>
                <Button variant="outline" type="button">
                    <GoogleIcon class="size-4" />
                    Sign up with Google
                </Button>
                <FieldDescription class="px-6 text-center">
                    Already have an account?
                    <NuxtLink
                        to="/signin"
                        class="underline underline-offset-4 hover:text-primary transition-colors"
                    >
                        Sign in
                    </NuxtLink>
                </FieldDescription>
            </Field>
        </FieldGroup>
    </form>
</template>
