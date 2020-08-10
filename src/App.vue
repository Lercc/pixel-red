<template>
  <main class="main">
    <sidebar 
    :red-sides="idToSidebar" 
    @projectid="setIdProject"
    :projectone="projectOne"
    @deleteProj="(e) => this.projectOne = e"
    />
    
    <div class="main__content">
      <router-view 
      :red="redes[projectIdActive]"
      @preCreated="setIdProject"
      @createProj="(e) => this.projectOne = e"
      />
    </div>
  </main>
</template>

<script>
import Sidebar from '@/components/Sidebar'

export default {
  name: 'App',
  
  components: {
    Sidebar,
  },

  data () {
     return {
       redes: [
        {
          id: '0',
          name: 'Proyecto 1',
        },
        // {
        //   id: '1',
        //   name: 'Proyecto 2',
        // },
      ],

      projectIdActive: "",
      projectOne: false,

    }
  },
 

  computed: {
    idToSidebar() {
      return this.redes.map( m => m.id)
    }
  },

  methods: {
    setIdProject(id) {
      this.projectIdActive = id
    },
  }

}
</script>

<style lang="scss" >
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
.main{
  width: 100vw;
  height: 100vh;
  background-color: $main-color;
  display: grid;
  grid-template-columns: 1fr 11fr;
  grid-template-rows: 1fr;

}
.main__content {
  margin: 30px 30px 30px 0px;
  border-radius: 50px;
  overflow: hidden;
  background-color: white;
  box-shadow: -2px -1px 10px 5px rgba(0, 0, 0, .2),
              1px 1px 5px 1px rgba(0, 0, 0, .1);
  
}
</style>

