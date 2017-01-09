var Search = React.createClass({
    componentDidMount: function () {
        this.AddClassActive()
    },
    componentDidUpdate: function () {
        this.AddClassActive();
    },
    render: function () {
        return (
            <div className="search-list" ref="mainSearch">
                <span data-value="all" onClick={this.props.onSearchNotes} ref="all">Все </span>
                <span data-value="old" onClick={this.props.onSearchNotes} ref="old">Завершеные </span>
                <span data-value="new" onClick={this.props.onSearchNotes} ref="new">Новые </span>
            </div>
        )
    },
    AddClassActive: function () {
        var refs = this.refs;
        for (var key in refs) {
            if (key == this.props.searchState) {
                refs[key].classList.add('selected');
            } else {
                refs[key].classList.remove('selected');
            }
        }
    }
});

var Item = React.createClass({
    componentDidMount: function () {
        this.addClassActive();
    },
    componentDidUpdate: function () {
        this.addClassActive();
    },
    render: function () {
        return (
            <li className="note" ref="note">
                <div className="change-state" onClick={this.props.onSetNotes}>Выполнить
                </div>
                <div className="note-text">{this.props.children}</div>
            </li>
        )
    },
    addClassActive: function () {
        if (this.props.stateNote == 'old')
            this.refs.note.classList.add('active');
    }
});

var List = React.createClass({
    render: function () {
        var setNotes = this.props.setNotesState;
        return (
            <div className="note-list">
                <ul>
                    {
                        this.props.notes.map(function (el) {
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
});

var ItemAdd = React.createClass({
    getInitialState: function () {
        return {
            text: ''
        }
    },
    handleChangeText: function (e) {
        var text = e.target.value;
        this.setState({
            text: text
        })
    },
    handleAddNote: function () {
        if(!this.state.text.trim())
            return;

        var newNote = {
            note: this.state.text,
            state: 'new',
            id: Date.now()
        };
        this.props.onAddNote(newNote);
        this.setState({
            text: ''
        })
    },
    render: function () {
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
});

var ListApp = React.createClass({
    getInitialState: function () {
        return {
            notes: [],
            state: 'all'
        }
    },
    handleNewNote: function (newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({
            notes: newNotes
        }, this.updateData);

    },
    componentDidMount: function () {
        var localNotes = JSON.parse(localStorage.getItem('list'));
        if (localNotes) {
            this.setState({notes: localNotes});
        }
    },
    setNote: function (note) {
        var localNotes = JSON.parse(localStorage.getItem('list'));
        localNotes.forEach(function (el) {
            if (el.id == note.id) {
                el.state = 'old';
            }
        });
        this.setState({
            notes: localNotes
        }, this.updateData);
    },
    updateData: function () {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('list', notes);
    },
    handleSearch: function (e) {
        var param = e.target.getAttribute('data-value');
        var localNotes = JSON.parse(localStorage.getItem('list'));
        var newNotes = localNotes.filter(function (el) {
            if (param == 'all')
                return el.state;
            return el.state == param;
        });

        this.setState({notes: newNotes, state: param})
    },
    render: function () {
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
});

ReactDOM.render(
    <ListApp/>,
    document.getElementById('content')
);