import '../assets/styles/footer.styl'

export default{
	data(){
		return{
			author: 'Ocly'
		}
	},
	render(){
		return(
			<div id="footer">
			<a href="https://github.com/yy1193889747/vue-webpack-todo">Written by {this.author}</a>
			</div>
		)
	}
}