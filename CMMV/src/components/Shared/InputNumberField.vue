 <template>
  <q-input
    type="number"
    rounded outlined
    :value="numbers"
    @input="(event) => $emit('update:numbers', event.target.value)"   />
 </template>
 <script>
export default {
    props: ['numbers']
}
</script>
