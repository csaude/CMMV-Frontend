 <template>
  <q-select ref="ref" rounded outlined :value="description" :options="options" />
 </template>
 <script>
export default {
    props: ['description', 'options']
}
</script>
