import { get_post, new_post, send_comment } from './dispatch';
import Type from './type';

test('Success get post', async () => {
    expect.assertions(1);
    const data = await get_post();
    expect(data.type).toEqual(Type.GET_POST);
});

test('Fail to get all post', async () => {
    expect.assertions(1);
    const data = await get_post();
    expect(data.type).toEqual(Type.ERROR);
});

test('Success creating post', async () => {
    expert.assertions(1);
    const data = await new_post();
    expect(data.type).toEqual(Type.NEW_POST);
});

test('Fail creating post', async () => {
    expert.assertions(1);
    const data = await new_post(null);
    expect(data.type).toEqual(Type.ERROR);
});