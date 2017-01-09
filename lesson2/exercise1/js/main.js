class Note extends React.Component {
    render() {
        const style = {backgroundColor: this.props.color};
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                {this.props.children}
            </div>
        );
    }
}

class Color extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickColor = this.handleClickColor.bind(this);
    }

    handleClickColor(e) {
        var color = e.target.style.backgroundColor;
        this.props.onHandleColor(color);
    }

    render() {
        let [red, green, gray, blue, purple] = [
            {
                backgroundColor: 'red'
            }, {
                backgroundColor: 'green'
            },
            {
                backgroundColor: 'gray'
            },
            {
                backgroundColor: 'blue'
            },
            {
                backgroundColor: 'purple'
            }];
        return (
            <div className="color-notes" onClick={this.handleClickColor}>
                <div className="color" style={red}></div>
                <div className="color" style={green}></div>
                <div className="color" style={gray}></div>
                <div className="color" style={blue}></div>
                <div className="color" style={purple}></div>
            </div>
        )
    }
}

class NoteEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            color: 'yellow'
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleClickColor = this.handleClickColor.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleNoteAdd() {
        const newNote = {
            text: this.state.text,
            color: this.state.color,
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        this.setState({text: '', color: 'yellow'});
    }

    handleClickColor(color) {
        this.setState({color: color});
    }

    render() {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <Color onHandleColor={this.handleClickColor}/>
                <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
            </div>
        );
    }
}

class NotesGrid extends React.Component {
    componentDidMount() {
        const grid = this.refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    }

    render() {
        const onNoteDelete = this.props.onNoteDelete;

        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(note => {
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
}

class NotesApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
    }

    componentDidMount() {
        const localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({notes: localNotes});
        }
    }

    componentDidUpdate() {
        this._updateLocalStorage();
    }

    handleNoteDelete(note) {
        const noteId = note.id;
        let newNotes = this.state.notes.filter(note => {
            return note.id !== noteId;
        });
        this.setState({notes: newNotes});
    }

    handleNoteAdd(newNote) {
        let newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({notes: newNotes});
    }

    render() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete}/>
            </div>
        );
    }

    _updateLocalStorage() {
        const notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
}

ReactDOM.render(
    <NotesApp />,
    document.getElementById('notes-app')
);