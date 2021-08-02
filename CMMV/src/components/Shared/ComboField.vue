 <template>
  <q-select rounded outlined :value="description" :options="options" />
 </template>
 <script>
export default {
    props: ['description', 'options']
}
</script>
