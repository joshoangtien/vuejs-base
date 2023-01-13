<template>
    <div>
        <button @click="login">{{ $t('login.login') }}</button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        methods: {
            login() {
                this.$router.push({ name: 'Dashboard' })
            }
        }
    }
</script>

<style scoped>

</style>