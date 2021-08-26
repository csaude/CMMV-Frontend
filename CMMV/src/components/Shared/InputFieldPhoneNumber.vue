 <template>
  <q-input
    rounded
    outlined
    ref="ref"
    type="tel"
    :value="phoneNumber"
    @input="$emit('update:phoneNumber' ,$event)"
    :rules="[val => !!val || 'O Campo é obrigatório']" />
</template>
<script>
export default {
    props: ['phoneNumber']
}
</script>
