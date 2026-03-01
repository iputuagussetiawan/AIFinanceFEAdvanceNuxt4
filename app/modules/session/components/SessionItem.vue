<script lang="ts" setup>
import { Loader2, Monitor, Smartphone, Trash2 } from 'lucide-vue-next';
</script>
<template>
    <div class="group flex w-full items-center py-1">
        <div
            class="mr-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted/30 text-muted-foreground group-hover:bg-muted group-hover:text-foreground transition-colors"
        >
            <Monitor class="size-5" />
            <!-- <Smartphone  class="size-5" /> -->
        </div>

        <div class="flex flex-1 items-center justify-between gap-4">
            <div class="flex-1 min-w-0">
                <h5
                    class="truncate text-sm font-semibold leading-tight text-foreground"
                >
                    Browser
                </h5>

                <div class="mt-1 flex items-center gap-2">
                    <div
                        class="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-600 dark:text-green-400 border border-green-500/20"
                    >
                        Active now
                    </div>

                    <span class="text-xs text-muted-foreground">
                        time agoe
                    </span>
                </div>
            </div>

            <Button
                variant="ghost"
                size="icon"
                class="size-9 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                @click="$emit('delete')"
            >
                <Loader2 class="size-4 animate-spin" />
                <Trash2 class="size-4" />
            </Button>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
