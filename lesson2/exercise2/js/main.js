class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            second: 0,
            isPause: true
        };
        this.start = this.start.bind(this);
        this.restart = this.restart.bind(this);
        this.tick = this.tick.bind(this);
    }
    tick() {
        if(this.state.isPause)
            return;
        this.setState({
            second: this.state.second + 1
        })
    }
    componentDidMount() {
        this.timer = setInterval(this.tick, 1000);
    }
    componentWillMount() {
        clearInterval(this.timer);
    }
    restart() {
        this.setState({
            second: 0
        })
    }
    start() {
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

    }
    render() {
        return(
                <div>
                    <button onClick={this.start} ref={'start'}>Старт</button>
                    <h4>Прошло {this.state.second} секунд</h4>
                    <button onClick={this.restart}>Возобновить</button>
                </div>
            )
    }
}


ReactDOM.render(
    <Timer/>,
    document.getElementById('content')
);