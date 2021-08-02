 <template>
  <q-input rounded outlined :value="description"  @input="(event) => $emit('update:description', event.target.value)"  :rules="[val => !!val || 'O Campo é obrigatório']" />
</template>
<script>
export default {
    props: ['description']
}
</script>
