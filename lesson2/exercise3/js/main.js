class Search extends React.Component{
    componentDidMount() {
        this.AddClassActive()
    }
    componentDidUpdate() {
        this.AddClassActive();
    }
    render() {
        return (
            <div className="search-list" ref="mainSearch">
                <span data-value="all" onClick={this.props.onSearchNotes} ref="all">Все </span>
                <span data-value="old" onClick={this.props.onSearchNotes} ref="old">Завершеные </span>
                <span data-value="new" onClick={this.props.onSearchNotes} ref="new">Новые </span>
            </div>
        )
    }
    AddClassActive() {
        let refs = this.refs;
        for (var key in refs) {
            if (key == this.props.searchState) {
                refs[key].classList.add('selected');
            } else {
                refs[key].classList.remove('selected');
            }
        }
    }
}

class Item extends React.Component{
    componentDidMount() {
        this.addClassActive();
    }

    componentDidUpdate() {
        this.addClassActive();
    }

    render() {
        return (
            <li className="note" ref="note">
                <div className="change-state" onClick={this.props.onSetNotes}>Выполнить
                </div>
                <div className="note-text">{this.props.children}</div>
            </li>
        )
    }

    addClassActive() {
        if (this.props.stateNote == 'old')
            this.refs.note.classList.add('active');
    }
}

class List extends React.Component{
    render() {
        let setNotes = this.props.setNotesState;
        return (
            <div className="note-list">
                <ul>
                    {
                        this.props.notes.map(el => {
                            return (
                                <Item
                                    key={el.id}
                                    stateNote={el.state}
                                    onSetNotes={setNotes.bind(null, el)}>
                                    {el.note}
                                </Item>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

class ItemAdd extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleAddNote = this.handleAddNote.bind(this);
    }

    handleChangeText(e) {
        const text = e.target.value;
        this.setState({
            text: text
        })
    }

    handleAddNote() {
        if(!this.state.text.trim())
            return;

        const newNote = {
            note: this.state.text,
            state: 'new',
            id: Date.now()
        };
        this.props.onAddNote(newNote);
        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <div className="item-add">
                <textarea
                    placeholder="Введите новую заметку..."
                    value={this.state.text}
                    onChange={this.handleChangeText}
                    className="textarea"
                >
                 </textarea>
                <button onClick={this.handleAddNote} className="add-button">Добавить</button>
            </div>

        )
    }
}

class ListApp extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            state: 'all'
        };
        this.handleNewNote = this.handleNewNote.bind(this);
        this.setNote = this.setNote.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleNewNote(newNote) {
        let newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({
            notes: newNotes
        }, this.updateData);

    }

    componentDidMount() {
        const localNotes = JSON.parse(localStorage.getItem('list'));
        if (localNotes) {
            this.setState({notes: localNotes});
        }
    }

    setNote(note) {
        let localNotes = JSON.parse(localStorage.getItem('list'));
        localNotes.forEach(el => {
            if (el.id == note.id) {
                el.state = 'old';
            }
        });
        this.setState({
            notes: localNotes
        }, this.updateData);
    }

    updateData() {
        const notes = JSON.stringify(this.state.notes);
        localStorage.setItem('list', notes);
    }

    handleSearch(e) {
        let param = e.target.getAttribute('data-value');
        let localNotes = JSON.parse(localStorage.getItem('list'));
        let newNotes = localNotes.filter(el => {
            if (param == 'all')
                return el.state;
            return el.state == param;
        });

        this.setState({notes: newNotes, state: param})
    }

    render() {
        return (
            <div className="list-app">
                <ItemAdd onAddNote={this.handleNewNote}/>
                <List notes={this.state.notes}
                      setNotesState={this.setNote}
                />
                <Search onSearchNotes={this.handleSearch}
                        searchState={this.state.state}
                />
            </div>
        )
    }
}

ReactDOM.render(
    <ListApp/>,
    document.getElementById('content')
);