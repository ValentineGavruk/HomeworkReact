class Word extends React.Component{
    constructor(props) {
        super(props);
        this.state = {notes: []};
        this.searchWord = this.searchWord.bind(this);
    }
    searchWord (e) {
        const name = e.target.value;
        if (!name.trim()) {
            return this.setState({
                name: 'stranger'
            })
        }
        this.setState({
            name: name
        });
    }
    render () {
        return (
            <div>
                <input type="text" onChange={this.searchWord}/>
                <h1>Hello, {this.state.name} !</h1>
            </div>

        )
    }
}


ReactDOM.render(
    <Word/>,
    document.getElementById('content')
);