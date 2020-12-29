<template>
  <div id="app">
  <b-navbar toggleable="lg" type="dark" variant="success" class='mb-4'>
    <b-navbar-brand href="#">
      <img src='./assets/money-trees.png' class="d-inline-block" width="35px"/>
      MoCo
    </b-navbar-brand>
  </b-navbar>

    <b-container fluid="sm">
      <!-- Container para exibir informações do app -->
      <b-row>
        <!-- Container para inserir informações -->
        <b-col>
          <b-card border-variant="success" class='bg-background-smooth-green'>
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
                placeholder="Parcels"></b-form-input>

              <b-button class='mr-4 mt-2' type="submit" variant="success">Submit</b-button>
              <b-button class='mt-2' type="reset" variant="danger" @click="clearFields()">Reset</b-button>
              <p/>
              <h5><b-badge variant="success">Total : {{total}}</b-badge></h5>
            </b-form>
          </b-card>
        </b-col>

          <!-- Container para exibir a lista de itens inseridos -->
        <b-col cols="8">
          <b-card border-variant="success" class='bg-background-smooth-green'>
            <div class='mt-3'>
              <template v-if='list.length === 0'>
                <b-list-group class='mb-2' horizontal>
                  <b-list-group-item class='text-center flex-fill bg-light pt-5 pb-5'>Sem itens adicionados</b-list-group-item>
                </b-list-group>
              </template>

              <template v-else>
                <b-list-group class='mb-2 d-flex' v-for="(items, index) in list" :key='index' horizontal>
                  <b-list-group-item @click="Delete(index)"> <b-icon icon='trash' title="Delete" variant="danger"/> </b-list-group-item>
                  <b-list-group-item @click="Edit()"> <b-icon icon='pencil-fill' title="Edit" variant="secondary" /> </b-list-group-item>
                  <b-list-group-item class='bg-background-list w-100'>{{items.productName}}</b-list-group-item>
                  <b-list-group-item class='w-25 bg-background-list'>{{items.value}}</b-list-group-item>
                  <b-list-group-item class='text-center bg-background-list'>{{items.productParcels}}</b-list-group-item>
                </b-list-group>
              </template>
            </div>
          </b-card>
        </b-col>
      </b-row>
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
        productParcels: 0,
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

      localStorage.setItem('@Moco-items', JSON.stringify(this.list));

      this.sumTotal();

      this.clearFields();
    },
    clearFields() {
      this.form.productName = '';
      this.form.value = '';
      this.form.productParcels = '';
    },
    sumTotal() {
      this.total = Math.round(this.list
        .map(({ value }) => value)
        .reduce((ttl, uni) => ttl + uni, 0));

      localStorage.setItem('@Moco-TotalPrice', this.total);
    },
    Delete(index) {
      this.list.splice(index, 1);

      localStorage.setItem('@Moco-items', JSON.stringify(this.list));
    },
    Edit() {
      // this.list.splice
    },
    localStorageClearItems() {
      // Clear all localStorage fields
      localStorage.clear('@Moco-items');
    },
    localStorageItems() {
      const getMocoItems = localStorage.getItem('@Moco-items');
      const setParsedMocoItems = JSON.parse(getMocoItems).reverse();

      this.list = setParsedMocoItems;
    },
  },
  created() {
    this.localStorageItems();
    this.sumTotal();
  },
};
</script>

<style lang="scss">
// cOLOR #84c226;
// cOLOR #1f1a17;
// cOLOR #00763a;
// cOLOR #00a13a;

.bg-background-smooth-green {
  background: var(--SmoothGreen);
}

.bg-background-list {
  background: #6aad7a;
  color: white;
}
</style>
