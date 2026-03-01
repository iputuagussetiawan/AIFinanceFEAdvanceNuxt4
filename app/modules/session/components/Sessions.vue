<script lang="ts" setup></script>
<template>
    <div className="rounded-xl bg-linear-to-r p-0.5">
        <div className="rounded-[10px] p-6">
            <pre></pre>
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
                        <SessionItem />
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
                            <li>
                                <SessionItem />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
