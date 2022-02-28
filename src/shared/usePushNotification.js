import { useRef } from 'react';
import { throttle } from './useThrottle';

const usePushNotification = () => {
  const notificationRef = useRef(null);

  // Notification이 지원되지 않는 브라우저가 있을 수 있기 때문에, 이를 대비해 Early return 문을 걸어준다.
  if (!Notification) {
    return;
  }

  //   만약 이미 유저가 푸시 알림을 허용해놓지 않았다면,
  if (Notification.permission !== 'granted') {
    // Crome - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return!
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return;
      });
    } catch (error) {
      // safari
      if (error instanceof TypeError) {
        Notification.requestPermission((permission) => {
          if (permission !== 'granted') return;
        });
      } else {
        console.error(error);
      }
    }
  }
  
  // 유저가 푸시 알림을 클릭하면, 푸시 알림이 일어난 화면으로 이동하기
  const setNotificationClickEvent = () => {
    notificationRef.current.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notificationRef.current.close();
    };
  };  

  // Notification을 위한 타이머를 설정하는 함수!
  const setNotificationTimer = (timeout) => {
    throttle(() => {
      // 시간이 다 흘렀으면 푸시 알림이 꺼지도록 해준다.
      notificationRef.current.close();
      // 그리고 역할을 다한 notificationRef를 null로 초기화해준다.
      notificationRef.current = null;
    }, timeout);
  };

  // 어떤 알림을 보낼 것인지, 몇 초마다 알림을 보낼 것인지에 대한 함수
  const fireNotificationWithTimeout = (title, timeout, options = {}) => {
    // 만약 유저가 푸시 알림을 꺼놓았다면 함수가 실행되지 않게 미리 return을 해준다.
    // 그런데 가드를 세워놨음에도 불구하고, Safari에서 실행되지 않는 문제점이 있었다. 이 문제는 해결중이다 ㅜㅜ!
    if (Notification.permission !== 'granted') return;

    // Notification API는 두 번째 인자로 option 값을 받는데, 뱃지 이미지와 아이콘 등을 설정해 줄 수 있다.
    // 초기 badge, icon을 설정해주었다.
    const newOption = {
      badge: 'https://babble.gg/img/logos/babble-speech-bubble.png',
      icon: 'https://babble.gg/img/logos/babble-speech-bubble.png',
      ...options,
    };

    // 만약 notificationRef가 아직 초기화되지 않았다면, 타이머가 아직 동작하고 있는거니까 notificationRef가 없을 때에만 새로운 알림을 만든다.
    if (!notificationRef.current) {
      // 여기 들어왔다는건 타이머가 실행되지 않고 있다는 것이니까, 타이머를 만들어준다.
      setNotificationTimer(timeout);
      
      // 푸시 알림에서 보여줄 title과 위에서 우리가 만든 custom option을 넣어준다.
      // 이 Notification 함수는 할당해도 바로 실행되기 때문에 첫 이벤트는 무조건 실행되고, 그 이후부터 타이머가 작동한다.
      notificationRef.current = new Notification(title, newOption);
      
      // Notification의 Click Event를 새로 붙여준다.
      setNotificationClickEvent();
    }
  };

  return { fireNotificationWithTimeout };
};

export default usePushNotification;