import { sc } from 'src/Styles';

export default {
  textSinceJoining: {
    color: sc.color.gray,
    fontSize: 15,
  },
  statBl: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  iconStatBl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  logOut: {
    marginTop: 30,
    marginHorizontal: sc.contentPadding,
  },
  input: {
    fontSize: 20,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 0,
  },
  inputLeftIcon: {
    fontSize: 18,
    paddingBottom: 7,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
  },
  profileAvatarBl: {
    backgroundColor: sc.color.orange,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarText: {
    fontSize: 23,
    fontFamily: sc.font.bold,
    color: sc.color.white,
  },
  imageUploadButtonsContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
};

export const manageAccounts = {};

export const referFriend = {
  shareButton: {
    width: 60,
    height: 60,
    marginRight: 15,
    justifyContent: 'center',
  },
};
