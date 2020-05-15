import { add_messages } from './dispatch';
import Type from './type';

test('Success adding message', async () => {
    expect.assertions(1);
    const data = {
        chatID: 'asdjdjja', 
        message: 'hello', 
        date: Date.now()
    }
    const dispatch = await add_messages(data);
    expect(dispatch.type).toEqual(Type.ADD_MESSAGE);
});

test('Fail adding message', async () => {
    expect.assertions(1);
    const data = null;
    const dispatch = await add_messages(data);
    expect(dispatch.type).toEqual(Type.ERROR);
});

test('Check when chat ID is invalid', async () => {
    expect.assertions(1);
    const data = {
        chatID: null, 
        message: 'hello', 
        date: Date.now()
    }
    const dispatch = await add_messages(data);
    expect(dispatch.type).toEqual(Type.ERROR);
});