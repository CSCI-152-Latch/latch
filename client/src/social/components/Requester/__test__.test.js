import { get_requesters, cancel_user } from './dispatch';
import Type from './type';

test('Success getting requesters', async () => {
    expect.assertions(1);
    const dispatch = await get_requesters();
    expect(dispatch.type).toEqual(Type.GET_REQUESTERS);
});

test('Fail getting requesters', async () => {
    expect.assertions(1);
    const dispatch = await get_requesters();
    expect(dispatch.type).toEqual(Type.ERROR);
});


test('Success cancel user', async () => {
    expect.assertions(1);
    const id = 'NF28XBB3580';
    const dispatch = await cancel_user(id);
    expect(dispatch.type).toEqual(Type.CANCEL_USER);
});

test('Fail cancel user', async () => {
    expect.assertions(1);
    const id = null;
    const dispatch = await cancel_user(id);
    expect(dispatch.type).toEqual(Type.ERROR);
});