<template>
    <div>
        <h3>Dashboard</h3>
        <button @click="$router.push({name: 'Login'})">Logout</button>
        <table>
            <tr>
                <th>Brand</th>
                <th>Title</th>
                <th>Price</th>
            </tr>
            <tr v-for="(product, index) in products" :key="index">
                <td>{{ product.brand }}</td>
                <td>{{ product.title }}</td>
                <td>{{ product.price }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "Dashboard",
        created() {
            this.getProducts()
        },
        methods: {
          ...mapActions({
              getProducts: 'products/getProducts'
          })
        },
        computed: {
            ...mapGetters({
                products: 'products/products'
            })
        }
    }
</script>

<style scoped>

</style>