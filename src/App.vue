<template>
  <div id="app">
<!-- Container para exibir informações sobre o app -->

<!-- Container para inserir informações -->
    <b-container fluid='md'>
      <b-form @submit.prevent="onSubmit">
        <b-form-input
          class='mb-2'
          v-model="form.productName"
          type="text"
          required
          placeholder="Insira o nome do que foi adquirido."></b-form-input>

        <b-form-input
          class='mb-2'
          v-model="form.value"
          type="number"
          step="0.01"
          min="0.00"
          required
          placeholder="valor"></b-form-input>

        <b-form-input
          class='mb-2'
          v-model="form.productParcels"
          type="number"
          placeholder="valor das parcelas"></b-form-input>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button class='ml-4' type="reset" variant="danger" @click="clearFields()">Reset</b-button>
        <p/>
        <b-badge>Total : {{total}}</b-badge>
      </b-form>

    <!-- Container para exibir a lista de itens inseridos -->
      <div class='mt-3'>
        <b-list-group class='mb-2' v-for="(items, index) in list" :key='index' horizontal>
          <b-list-group-item class='Flex-1 Smooth-background'>{{items.productName}}</b-list-group-item>
          <b-list-group-item class='Flex-1 Smooth-background'>{{items.value}}</b-list-group-item>
          <b-list-group-item class='Flex-1 Smooth-background'>{{items.productParcels}}</b-list-group-item>
        </b-list-group>
      </div>
    </b-container>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        productName: '',
        value: '',
        productParcels: '',
      },
      list: [],
      total: 0,
    };
  },
  methods: {
    onSubmit() {
      const { productName, value, productParcels } = this.form;

      this.list.push({
        productName,
        value: Number(value),
        productParcels,
      });

      this.sumTotal();
    },
    clearFields() {
      this.form.productName = '';
      this.form.value = '';
      this.form.productParcels = '';
    },
    sumTotal() {
      this.total = this.list
        .map(({ value }) => value)
        .reduce((ttl, uni) => ttl + uni, 0);
    },
  },
};
</script>

<style lang="scss">
  .Flex-1 {
    flex: 1;
  }

  .Smooth-background {
    background: rgb(224, 224, 224);
  }
</style>
