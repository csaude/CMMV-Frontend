<template>
  <div class="q-ma-lg">
        <div class="row q-mb-lg">
        <q-item-label class="text-h4">{{title}}</q-item-label>
    </div>
    <div class="row">
        <p>
            {{content}}
        </p>
    </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'content']
}
</script>

<style>

</style>
