import { get_responders, accept_user, decline_user, create_chat } from './dispatch';
import Type from './type';

test('Success getting responders', async () => {
    expect.assertions(1);
    const dispatch = await get_responders();
    expect(dispatch.type).toEqual(Type.GET_RESPONDERS);
});

test('Fail getting responders', async () => {
    expect.assertions(1);
    const dispatch = await get_responders();
    expect(dispatch.type).toEqual(Type.GET_RESPONDERS);
});



test('Success on accept user', async () => {
    expect.assertions(1);
    const id = 'NF28XBB3580';
    const dispatch = await accept_user(id);
    expect(dispatch.type).toEqual(Type.ACCEPT_USER);
});

test('Fail on accept user', async () => {
    expect.assertions(1);
    const id = null;
    const dispatch = await accept_user(id);
    expect(dispatch.type).toEqual(Type.ERROR);
});


test('Success on decline user', async () => {
    expect.assertions(1);
    const id = 'NF28XBB3580';
    const dispatch = await decline_user(id);
    expect(dispatch.type).toEqual(Type.DECLINE_USER);
});

test('Fail on decline user', async () => {
    expect.assertions(1);
    const id = null;
    const dispatch = await decline_user(id);
    expect(dispatch.type).toEqual(Type.ERROR);
});



test('Success on create chat', async () => {
    expect.assertions(1);
    const id = 'NF28XBB3580';
    const dispatch = await create_chat(id);
    expect(dispatch.type).toEqual(expect.anything());
});

test('Fail on create chat', async () => {
    expect.assertions(1);
    const id = null;
    const dispatch = await create_chat(id);
    expect(dispatch.type).toEqual(Type.ERROR);
});