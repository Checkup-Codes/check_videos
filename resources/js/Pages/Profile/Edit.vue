<script setup lang="ts">
import DeleteUserForm from './Partials/DeleteUserForm.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';

defineProps<{
  mustVerifyEmail?: boolean;
  status?: string;
}>();
</script>

<template>
  <div class="h-[calc(100vh-3rem)] overflow-y-auto overscroll-none lg:h-[calc(100vh-5.5rem)]">
    <Head title="Profil" />

    <div class="mx-auto max-w-3xl space-y-6 py-6">
      <div class="mb-4">
        <h1 class="text-2xl font-semibold text-foreground">Profil</h1>
        <p class="mt-1 text-sm text-muted-foreground">Hesap bilgilerinizi ve şifrenizi yönetin.</p>
      </div>
      <UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status" />
      <UpdatePasswordForm />
      <DeleteUserForm />
    </div>
  </div>
</template>
