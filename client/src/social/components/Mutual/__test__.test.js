import { get_mutuals, add_user } from './dispatch';
import Type from './type';

test('Success getting users', async () => {
    expect.assertions(1);
    const dispatch = await get_mutuals();
    expect(dispatch.type).toEqual(Type.GET_MUTUALS);
});

test('Fail getting users', async () => {
    expect.assertions(1);
    const dispatch = await get_mutuals();
    expect(dispatch.type).toEqual(Type.ERROR);
});


test('Success adding message', async () => {
    expect.assertions(1);
    const id = 'NF28XBB3580';
    const dispatch = await add_user(id);
    expect(dispatch.type).toEqual(Type.ADD_USER);
});

test('Fail adding message', async () => {
    expect.assertions(1);
    const id = null;
    const dispatch = await add_user(id);
    expect(dispatch.type).toEqual(Type.ERROR);
});