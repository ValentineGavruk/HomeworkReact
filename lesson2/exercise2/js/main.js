var Timer = React.createClass({
    getInitialState: function () {
        return {
            second: 0,
            isPause: true
        }
    },
    tick: function () {
        if(this.state.isPause)
            return;
        this.setState({
            second: this.state.second + 1
        })
    },
    componentDidMount: function () {
        this.timer = setInterval(this.tick, 1000);
    },
    componentWillMount: function () {
        clearInterval(this.timer);
    },
    restart: function () {
        this.setState({
            second: 0
        })
    },
    start: function () {
        if(!this.state.isPause){
            this.refs.start.innerText = 'Старт';
            this.setState({
                isPause: true
            })
        }else{
            this.refs.start.innerText = 'Пауза';
            this.setState({
                isPause: false
            })
        }

    },
    render: function () {
        return(
                <div>
                    <button onClick={this.start} ref={'start'}>Старт</button>
                    <h4>Прошло {this.state.second} секунд</h4>
                    <button onClick={this.restart}>Возобновить</button>
                </div>
            )
    }
});


ReactDOM.render(
    <Timer/>,
    document.getElementById('content')
);