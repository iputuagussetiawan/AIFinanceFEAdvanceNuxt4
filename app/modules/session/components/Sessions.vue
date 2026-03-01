<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import SessionItem from './SessionItem.vue';

const { $api } = useNuxtApp();

// 1. Define the Query
const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['user-sessions'], // Unique key for caching
    queryFn: () => $api.session.getSessions(), // Your repository method
    // Optional Configurations:
    staleTime: 1000 * 60 * 5, // Consider data "fresh" for 5 minutes
    retry: 1, // If it fails (e.g. 401), only retry once
});

// 2. Compute the current active session
const currentSession = computed(() => {
    return data.value?.sessions?.find((s: any) => s.isCurrent);
});

// 3. Compute other sessions (exclude the current one)
const otherSessions = computed(() => {
    return data.value?.sessions?.filter((s: any) => !s.isCurrent) || [];
});
</script>
<template>
    <div className="rounded-xl bg-linear-to-r p-0.5">
        <div className="rounded-[10px] p-6">
            <h3
                className="text-xl tracking-[-0.16px] text-slate-12 font-bold mb-1"
            >
                Sessions
            </h3>
            <p
                className="mb-6 max-w-xl text-sm text-[#0007149f] dark:text-gray-100 font-normal"
            >
                Sessions are the devices you are using or that have used your
                Squeezy These are the sessions where your account is currently
                logged in. You can log out of each session.
            </p>

            <!-- <Loader2 className="animate-spin" /> -->

            <div className="rounded-t-xl max-w-xl">
                <div>
                    <h5 className="text-base font-semibold">
                        Current active session
                    </h5>
                    <p
                        className="mb-6 text-sm text-[#0007149f] dark:text-gray-100"
                    >
                        You’re logged into this Squeezy account on this device
                        and are currently using it.
                    </p>
                </div>
                <div className="w-full mt-4">
                    <div className="w-full py-2 border-b pb-5">
                        <SessionItem
                            v-if="currentSession"
                            :session="currentSession"
                            :loading="isLoading"
                            @delete="
                                (id) => console.log('Deleting session:', id)
                            "
                        />
                    </div>
                    <div className="mt-4">
                        <h5 className="text-base font-semibold">
                            Other sessions
                        </h5>
                        <ul
                            className="mt-4 w-full space-y-4 max-h-[400px
                overflow-y-auto
                "
                        >
                            <li
                                v-for="session in otherSessions"
                                :key="session._id"
                            >
                                <SessionItem
                                    :session="session"
                                    :loading="isLoading"
                                    @delete="(id) => console.log(id)"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
