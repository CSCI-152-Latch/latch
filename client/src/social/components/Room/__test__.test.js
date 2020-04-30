import { get_chats, get_messages } from './dispatch';
import Type from './type';

test('Success get chat', async () => {
    expect.assertions(1);
    const dispatch = await get_chats();
    expect(dispatch.type).toEqual(Type.GET_ROOM);
});

test('Fail get chat', async () => {
    expect.assertions(1);
    const dispatch = await get_chats();
    expect(dispatch.type).toEqual(Type.GET_ROOM);
});



test('Success get messages', async () => {
    expect.assertions(1);
    const dispatch = await get_messages();
    expect(dispatch.type).toEqual(Type.GET_MESSAGES);
});

test('Fail get messages', async () => {
    expect.assertions(1);
    const dispatch = await get_messages();
    expect(dispatch.type).toEqual(Type.GET_MESSAGES);
});

