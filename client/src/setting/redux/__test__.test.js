import Functions from './dispatch';
import Type from './type';

test('Success on get user data', async () => {
    expect.assertions(1);
    const data = await Functions.set_field();
    expect(data.type).toEqual(Type.GET_USER);
});

test('Fail on get user data', async () => {
    expect.assertions(1);
    const data = await Functions.get_field();
    expect(data.type).toEqual(Type.ERROR);
});



test('Success on updating first name field', async () => {
    expect.assertions(1);
    const data = await Functions.update_field('firstName', 'Khai');
    expect(data.type).toEqual(Type.UPDATE_USER);
});

test('Whem first name field is empty', async () => {
    expect.assertions(1);
    const data = await Functions.update_field('firstName', '');
    expect(data.type).toEqual(Type.UPDATE_USER);
});

test('Fail on updating first name field', async () => {
    expect.assertions(1);
    const data = await Functions.update_field('firstName', 'Khai');
    expect(data.type).toEqual(Type.ERROR);
});



test('Success on updating last name field', async () => {
    expect.assertions(1);
    const data = await Functions.update_field('lastName', 'Pham');
    expect(data.type).toEqual(Type.UPDATE_USER);
});

test('When last name field is empty', async () => {
    expect.assertions(1);
    const data = await Functions.update_field('lastName', '');
    expect(data.type).toEqual(Type.UPDATE_USER);
});

test('Fail on updating last name field', async () => {
    expect.assertions(1);
    const data = await Functions.update_field('lastName', 'Pham');
    expect(data.type).toEqual(Type.ERROR);
});



test('Fail when passing invalid field', async () => {
    expect.assertions(1);
    const data = await Functions.update_field('user', 'Pham');
    expect(data.type).toEqual(Type.ERROR);
});