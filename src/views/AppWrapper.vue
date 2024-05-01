<template>
    <div>
        <HeaderC/>
        <router-view/>
        <FooterC/>
    </div>
</template>

<script>
import HeaderC from '@/components/HeaderC.vue'
import FooterC from '@/components/FooterC.vue'
export default {
    components: {
        HeaderC,
        FooterC
    }
}
</script>