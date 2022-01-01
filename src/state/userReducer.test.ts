import {userReducer} from './userReducer';

test('user reducer should increment only age', ()=>{
    const startState = {age: 17, childrenCount: 0, name: 'Tasya'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})
    expect(endState.age).toBe(18)
    expect(endState.childrenCount).toBe(0)
})
test('user reducer should increment only children count', ()=>{
    const startState = {age: 17, childrenCount: 0, name: 'Tasya'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
    expect(endState.age).toBe(17)
    expect(endState.childrenCount).toBe(1)
})
test('user reducer should change user name', ()=>{
    const startState = {age: 17, childrenCount: 0, name: 'Tasya'};
    const newName = 'TasyaKENT';
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName})
    expect(endState.childrenCount).toBe(0)
    expect(endState.age).toBe(17)
    expect(endState.name).toBe('TasyaKENT')
})