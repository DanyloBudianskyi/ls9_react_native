import * as SQLite from "expo-sqlite"

export const openDatabase = async () => {
    return await SQLite.openDatabaseAsync('taskList.db')
}

export const createTable = async () => {
    const database =  await openDatabase()
    try{
        await database.execAsync(`
            PRAGMA journal_mode = WAL;
            create table if not exists tasks(
                id integer primary key autoincrement,
                description text not null,
                isCompleted integer not null,
                date text not null
            );
        `)
        console.log('Table created')
    }catch(error) {
        console.error("Error: ", error)
    }
}

export const insertTask = async (description, date) => {
    if(!description){
        return
    }
    const database = await openDatabase()

    try{
        const result = await database.runAsync('insert into tasks (description, isCompleted, date) values (?, ?, ?)', description, 0, date)
        console.log("Task id: ", result.lastInsertRowId)
    }catch(error) {
        console.error("Error: ", error)
    }
}

export const fetchTasks = async () => {
    const database = await openDatabase()
    try{
        const allRows = await database.getAllAsync('select * from tasks order by date asc')
        console.log('All tasks: ', allRows)
        return allRows
    }catch(error) {
        console.error("Error: ", error)
    }
}

export const updateTask = async (id, description) => {
    if(id == null || !description){
        return
    }
    const database = await openDatabase()
    try{
        const res = await database.runAsync('update tasks set description = ? where id = ?', description, id)
        console.log('Task updated: ', res)
    }catch(error) {
        console.error("Error: ", error)
    }
}

export const deleteTask = async (id) => {
    const database = await openDatabase()
    if(!id){
        return
    }
    try{
        const result = await database.runAsync('delete from tasks where id = ?', id)
        console.log("Task deleted: ", result)
    }catch(error) {
        console.error("Error: ", error)
    }
}

export const fetchTasksByDate = async (date) => {
    const database = await openDatabase()
    try{
        const result = await database.getAllAsync('select * from tasks where date = ?', date)
        return result
    }catch(error) {
        console.error("Error: ", error)
    }
}

export const changeTaskStatus = async (id, isCompleted) => {
    const database = await openDatabase()
    try{
        const result = await database.runAsync('update tasks set isCompleted = ? where id = ?', isCompleted, id)
        console.log("task updated: ", result)
    }catch(error) {
        console.error("Error: ", error)
    }
}