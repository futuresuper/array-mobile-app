
import {
  isIOS,
} from 'src/Common/Helpers';

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

export const talkUs = {
  container: {
    flex: 1,
    backgroundColor: sc.color.containerBgColor,
  },
  header: {
    paddingTop: isIOS() ? 30 : 0,
    flex: 0.35,
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMessage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 0.65,
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#CDC8CC',
    paddingHorizontal: 10,
    padding: 5,
  },
  btnSend: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    color: sc.color.primary,
  },
  inputContainer: {
    borderBottomColor: '#CDC8CC',
    backgroundColor: '#CDC8CC',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#CDC8CC',
    flex: 1,
  },
  balloon: {
    maxWidth: 250,
    padding: 8,
    borderRadius: 20,
  },
  baloonText: {
    color: '#FFFF',
  },
  itemIn: {
    alignSelf: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 5,
    backgroundColor: '#6A608C',
  },
  itemOut: {
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 20,
    backgroundColor: '#292049',
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
};
