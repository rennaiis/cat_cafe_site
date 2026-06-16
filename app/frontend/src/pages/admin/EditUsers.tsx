import React, { Fragment, useEffect, useState, type ChangeEvent } from 'react';
import type { User } from "../../types"
import { createUser, getUsers, removeUser, updateUser } from "../../API/UsersAPI"
import styles from '../../styles/admin.module.css';
import { UserRole } from "../../../../enums/UserRole";

function EditUsers(){
    const [users, setUsers] = useState<User[]>([])
    const [editedUser, setEditedUser] = useState<User | null>(null)
    const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
        login: '', 
        password_hash: '', 
        role: UserRole.ADMIN
    })
    async function loadData() {
        await getUsers().then((data)=>{
            setUsers(data)
        }).catch((err)=>console.error('loading users mistake: ', err))
    }
    const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editedUser) return;
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value
        })
    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        })
    }
    async function editUser(e: React.FormEvent) {
        e.preventDefault()
        if (!editedUser) return
        try{
            await updateUser({
                login: editedUser.login,
                password_hash: editedUser.password_hash,
                role: editedUser.role
            }, editedUser.id)
            setEditedUser(null); 
            loadData();           
        } catch (err) {
            console.error("edit error", err)
        }
    }

    async function addUser(e: React.FormEvent) {
        e.preventDefault()
        if (!editedUser) return
        try{
            await createUser(newUser)
            loadData();           
        } catch (err) {
            console.error("edit error", err)
        }
    }
    const roles = Object.values(UserRole)
    useEffect(()=>{loadData()}, [])
    return( 
        <main className={styles.container}>
            <h2>Управление пользователями</h2>
            <form onSubmit={addUser} className={styles.itemCardVertical}>
                <label>Логин</label>
                <input 
                    type="text" 
                    name='login'
                    value={newUser.login}
                    onChange={handleFormChange}
                    required   
                 />
                <label>Пароль</label>
                <input 
                    type="password" 
                    name='password_hash'
                    value={newUser.password_hash}
                    onChange={handleFormChange} />
                <label>Роль</label>
                <select
                    name='role'
                    onChange={handleFormChange}
                    required>
                    {roles.map((option)=>(
                        <option key={option} value={option}>{option}</option>                            
                    ))}
                </select>
                <button type='submit'>Добавить пользователя</button>
            </form>

            <div className={styles.adoptersGrid + ' ' + styles.card}>           
                <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Логин</div>
                <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Пароль</div>
                <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Роль</div>
                <div className={`${styles.gridTh} ${styles.hideOnMobile}`}>Действия</div>
                {users.map((user)=>(
                    editedUser && editedUser.id === user.id ?
                    <Fragment key={user.id}>
                        <div className={styles.gridTd}  data-label="Логин">
                            <input 
                                type="text" 
                                placeholder='Логин'
                                name='login'
                                value={editedUser.login}
                                onChange={handleEditChange}
                                required                                   
                            />
                        </div>
                        <div className={styles.gridTd}  data-label="Пароль">
                            <input 
                                type="password" 
                                placeholder='Пароль'
                                name='password_hash'
                                value={editedUser.password_hash}
                                onChange={handleEditChange}
                                required                                   
                            />
                        </div>
                        <div className={styles.gridTd}  data-label="Роль">
                            <select
                                name='role'
                                value={editedUser.role}
                                onChange={handleEditChange}
                                required>
                                {roles.map((option)=>(
                                    <option key={option} value={option}>{option}</option>                            
                                ))}
                            </select>
                        </div>
                        <div className={`${styles.gridTd} ${styles.actions}`}>
                            <div><button type="button" onClick={editUser}>Сохранить</button></div>
                            <div><button type="button" onClick={()=>setEditedUser(null)}>Отмена</button></div>
                        </div>   
                    </Fragment>:
                    <Fragment key={user.id}>
                            <div className={styles.gridTd} data-label="Логин">
                                {user.login}
                            </div>
                            <div className={styles.gridTd} data-label="Пароль">
                                {user.password_hash}
                            </div>
                            <div className={styles.gridTd} data-label="Роль">
                                {user.role}
                            </div>
                            <div className={`${styles.gridTd} ${styles.actions}`}>
                                <div><button type="button" onClick={()=>setEditedUser(user)}>Редактировать</button></div>
                                <div><button type="button" 
                                    onClick={async ()=> {
                                        await removeUser(user.id)
                                        loadData()
                                    }}>Удалить</button></div>
                            </div> 
                    </Fragment>
                ))}
            </div>
        </main>
    )
}
export default EditUsers