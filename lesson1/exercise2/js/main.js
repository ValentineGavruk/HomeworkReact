var dataName = 'stranger';

var Word = React.createClass({
    getInitialState: function () {
        return {
            name: dataName
        };
    },
    searchWord: function (e) {
        var name = e.target.value;
        if(!name.trim()){
           return  this.setState({
               name: dataName
           })
        }
        this.setState({
            name: name
        });
    },
    render: function () {
        return(
            <div>
                <input type="text"  onChange={this.searchWord}/>
                <h1>Hello, {this.state.name} !</h1>
            </div>

        )
    }
});


ReactDOM.render(
    <Word/>,
    document.getElementById('content')
);