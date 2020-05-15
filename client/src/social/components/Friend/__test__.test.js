import { get_friends, delete_user } from './dispatch';
import Type from './type';

test('Success on getting friends', async () => {
    expect.assertions(1);
    const data = await get_friends();
    expect(data.type).toEqual(Type.GET_FRIENDS);
});

test('Fail on getting friends', async () => {
    expect.assertions(1);
    const data = await get_friends();
    expect(data.type).toEqual(Type.ERROR);
});



test('Success on deleting friends', async () => {
    expect.assertions(1);
    const data = await delete_user();
    expect(data.type).toEqual(Type.DELETE_USER);
});

test('Fail on deleting friends', async () => {
    expect.assertions(1);
    const data = await delete_user(null);
    expect(data.type).toEqual(Type.ERROR);
});