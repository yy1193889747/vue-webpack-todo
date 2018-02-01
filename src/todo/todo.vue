<template>
    <section class="real-app">
    	<button class="buttons" @click="shuffle">Shuffle</button>
        <input 
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下来做什么"
        @keyup.enter="addTodo"
        >
        <transition-group name="flip-list">
        <Item 
        :todo="todo"
        v-for="(todo,index) in filteredTodos"
        :key="todo.id"
        @del="deleteTodo"
        ></Item></transition-group>
        <!--"@del=todos.splice(index,1)" 可以这样写-->
        <Tabs 
        :filter="filter" 
        :todos="todos"
        @toggle="toggleFilter"
        @clearAll="clearAllCompleted"
        ></Tabs>
    </section>   
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
import './lodash.min.js'
let id = 0
export default {
    data() {
        return {
            todos:[],
            filter:"all"
        }
    },
  components: {
      Item,
      Tabs
  },
  computed:{
      filteredTodos(){
          if (this.filter === 'all'){
              return this.todos
          }
          const completed = this.filter === 'completed'
          return this.todos.filter(todo => completed ===todo.completed)
      },
  },
  methods: {
      addTodo(e){
      	 if(this.todos.length>4){
			alert("加太多了哦")
			return
         }
         if(e.target.value.trim()==''){
             alert("你什么都没有添加哦")
             e.target.value =''
         }
         else{
             this.todos.unshift({
              id:id++,
              content: e.target.value.trim(),
              completed:false
          }),
          e.target.value =''
         }
          
      },
     deleteTodo(id){
         this.todos.splice(this.todos.findIndex(todo => todo.id ===id),1)
     },
     toggleFilter(state){
         this.filter =state
     },
     clearAllCompleted(){
         this.todos = this.todos.filter(todo => !todo.completed)
         
     },
     shuffle(){
     	this.todos = _.shuffle(this.todos)
     }
  },
}
</script>
<style lang="stylus" scoped>
.buttons{
	margin 21px 500px
	position: fixed
}
.real-app{
    width 600px
    margin :0px  auto
    box-shadow :0px 0px 5px #666
}
.add-input{
    positon:relative;
    margin 0px
    width 100%
    font-size 24px
    font-family  inherit 
    font-weight:inherit
    line-height 1.4rem
    border 0;
    outline none 
    color inherit
    padding 6px
    border 1px solid #999
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
    box-sizing border-box
    font-smoothing:antialiased;
    padding 16px 16px 16px 60px
    border none  
}
.flip-list-move{
  transition: transform 0.8s;
}
</style>