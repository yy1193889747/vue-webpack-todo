<template>
<div id="app">	
	<div id="cover"></div>
	<Header></Header>
	<todo></todo>
	<Footer></Footer>
</div>

</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'
export default {
	components:{
		Header,
		Footer,
		Todo,
	}

}	
</script>

//背景虚化，scoped只应用于本组件
<style lang="stylus" scoped>
#app{
	position absolute
	left 0
	right 0
	top 0
	bottom 0
}
#cover{
	position absolute
	left 0
	right 0
	top 0
	bottom 0
	background-color #999
	opacity .7
	z-index -1	
}
</style>