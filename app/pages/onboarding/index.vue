<script setup lang="ts">
import { ref } from 'vue';
import { motion } from 'motion-v';
import { Briefcase, User, ArrowRight, CheckCircle2 } from 'lucide-vue-next';

const props = defineProps<{
    onSelect?: (role: string) => void;
}>();

const emit = defineEmits(['select']);
const selected = ref<string | null>(null);

const roles = [
    {
        id: 'jobseeker',
        title: 'Job Seeker',
        description: 'Find your dream job and build your career',
        icon: User,
        gradient: 'from-green-500 to-emerald-600',
        lightBg: 'bg-green-50 dark:bg-green-950/30', // Added dark bg
        border: 'border-green-200 dark:border-green-900/50',
        activeBorder: 'border-green-500 dark:border-green-400',
        iconColor: 'text-green-600 dark:text-green-400',
        features: [
            'Browse thousands of jobs',
            'AI-powered matching',
            'Track applications',
        ],
    },
    {
        id: 'employer',
        title: 'Employer',
        description: 'Hire top talent and grow your team',
        icon: Briefcase,
        gradient: 'from-teal-500 to-green-400',
        lightBg: 'bg-teal-50 dark:bg-teal-950/30', // Added dark bg
        border: 'border-teal-200 dark:border-teal-900/50',
        activeBorder: 'border-teal-500 dark:border-teal-400',
        iconColor: 'text-teal-600 dark:text-teal-400',
        features: [
            'Post unlimited jobs',
            'Smart candidate filtering',
            'Analytics dashboard',
        ],
    },
];

const handleContinue = () => {
    if (selected.value) {
        emit('select', selected.value);
        if (props.onSelect) props.onSelect(selected.value);
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-linear-to-br">
        <div class="w-full max-w-2xl">
            <motion.div
                :initial="{ opacity: 0, y: -20 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5 }"
                class="text-center mb-10"
            >
                <h1
                    class="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    How will you use
                    <span
                        class="block bg-linear-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-700 bg-clip-text text-transparent mt-1"
                    >
                        our platform?
                    </span>
                </h1>
                <p
                    class="mt-4 text-gray-500 dark:text-slate-400 text-lg max-w-md mx-auto"
                >
                    Choose your role to get a personalized experience
                </p>
            </motion.div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div
                    v-for="(role, index) in roles"
                    :key="role.id"
                    :initial="{ opacity: 0, y: 30 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ duration: 0.4, delay: index * 0.15 }"
                >
                    <div
                        @click="selected = role.id"
                        :class="[
                            'relative cursor-pointer overflow-hidden transition-all duration-300 border-2 p-6 rounded-2xl shadow-sm',
                            'dark:backdrop-blur-sm',
                            selected === role.id
                                ? `${role.activeBorder} shadow-xl scale-[1.02] bg-white dark:bg-slate-800`
                                : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-gray-200 dark:hover:border-slate-700 hover:shadow-lg',
                        ]"
                    >
                        <motion.div
                            v-if="selected === role.id"
                            :initial="{ scale: 0 }"
                            :animate="{ scale: 1 }"
                            class="absolute top-4 right-4"
                        >
                            <CheckCircle2
                                :class="['w-6 h-6', role.iconColor]"
                            />
                        </motion.div>

                        <div
                            :class="[
                                'w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300',
                                selected === role.id
                                    ? `bg-linear-to-br ${role.gradient} shadow-lg shadow-green-500/20`
                                    : role.lightBg,
                            ]"
                        >
                            <component
                                :is="role.icon"
                                :class="[
                                    'w-7 h-7 transition-colors duration-300',
                                    selected === role.id
                                        ? 'text-white'
                                        : role.iconColor,
                                ]"
                            />
                        </div>

                        <h3
                            class="text-xl font-semibold text-gray-900 dark:text-white mb-1.5"
                        >
                            {{ role.title }}
                        </h3>
                        <p
                            class="text-gray-500 dark:text-slate-400 text-sm mb-5 leading-relaxed"
                        >
                            {{ role.description }}
                        </p>

                        <ul class="space-y-2.5">
                            <li
                                v-for="(feature, i) in role.features"
                                :key="i"
                                class="flex items-center gap-2.5 text-sm text-gray-600 dark:text-slate-300"
                            >
                                <div
                                    :class="[
                                        'w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300',
                                        selected === role.id
                                            ? `bg-linear-to-r ${role.gradient}`
                                            : 'bg-gray-300 dark:bg-slate-700',
                                    ]"
                                />
                                {{ feature }}
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>

            <motion.div
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ delay: 0.5 }"
                class="mt-8 flex justify-center"
            >
                <button
                    @click="handleContinue"
                    :disabled="!selected"
                    :class="[
                        'px-8 py-4 text-base font-bold rounded-xl flex items-center transition-all duration-300 active:scale-95',
                        selected
                            ? 'bg-linear-to-r from-green-500 to-teal-500 text-white shadow-lg shadow-green-500/20 hover:brightness-110 cursor-pointer'
                            : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600 cursor-not-allowed',
                    ]"
                >
                    Continue
                    <ArrowRight class="w-5 h-5 ml-2" />
                </button>
            </motion.div>

            <p
                class="text-center text-xs text-gray-400 dark:text-slate-500 mt-6"
            >
                You can change this later in your settings
            </p>
        </div>
    </div>
</template>
