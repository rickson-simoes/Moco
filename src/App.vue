<template>
  <div id="app">
    <b-container fluid='md'>

<!-- Container para exibir informações do app -->
      <b-media>
        <template #aside>
          <img src='./assets/guy-logo-finances.svg' width="380px"/>
        </template>

        <h5 class='mt-4'>MoCo - Money Control</h5>
        <i>
          <p class='mt-4'>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
          Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
          ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
          </p>
          <p>
            Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </p>
        </i>
      </b-media>

<!-- Container para inserir informações -->
      <b-form @submit.prevent="onSubmit">
        <b-form-input
          class='mb-2'
          v-model="form.productName"
          type="text"
          required
          placeholder="Description"></b-form-input>

        <b-form-input
          class='mb-2'
          v-model="form.value"
          type="number"
          step="0.01"
          min="0.00"
          required
          placeholder="Value"></b-form-input>

        <b-form-input
          class='mb-2'
          v-model="form.productParcels"
          type="number"
          placeholder="Parcelas"></b-form-input>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button class='ml-4' type="reset" variant="danger" @click="clearFields()">Reset</b-button>
        <p/>
        <b-badge>Total : {{total}}</b-badge>
      </b-form>

    <!-- Container para exibir a lista de itens inseridos -->
      <div class='mt-3'>
        <b-list-group class='mb-2' v-for="(items, index) in list" :key='index' horizontal>
          <b-list-group-item @click="Delete(index)"> <b-icon icon='trash' title="Delete"/> </b-list-group-item>
          <b-list-group-item @click="Edit()"> <b-icon icon='pencil' title="Edit"/> </b-list-group-item>
          <b-list-group-item class='flex-fill bg-light'>{{items.productName}}</b-list-group-item>
          <b-list-group-item class='flex-fill bg-light'>{{items.value}}</b-list-group-item>
          <b-list-group-item class='flex-fill bg-light'>{{items.productParcels}}</b-list-group-item>
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
    Delete(index) {
      this.list.splice(index, 1);
    },
    Edit() {
      // this.list.splice
    },
  },
};
</script>

<style lang="scss">

</style>
