import { setAlert } from './alert';
import { loadUser } from './auth';
import { getCurrentProfile, getProfiles } from './profile';

test('Send Danger Message', () => {
    expect(setAlert('err', 'danger')).toEqual(expect.anything());
}); 

test('Fail to Send Alert', () => {
    expect(setAlert('err', 'success')).toEqual(1);
}); 

test('Success Loading User', () => {
    expect(loadUser()).toEqual(expect.anything());
});

test('Fail Loading User', () => {
    expect(loadUser()).toEqual(null);
});

test('Success get current user profile', () => {
    expect(getCurrentProfile()).toEqual(expect.anything());
})

test('Fail get current user profile', () => {
    expect(getCurrentProfile()).toEqual(null);
})

test('Success get user profile', () => {
    expect(getProfiles()).toEqual(Object);
})

test('Fail get user profile', () => {
    expect(getProfiles()).toEqual(null);
})

