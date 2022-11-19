import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    // i18next-http-backend
    // loads translations from your server
    // https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: false,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
              translation: {
                homepage:{
                    title:" There's a better way to ask",
                    para:"You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make everyone happy.",
                    btn_1:"Doing Quiz",
                    btn_2:"Let's started"
                }
              }
            },
            vi: {
                translation: {
                  homepage:{
                      title:"Đây là cách tốt nhất để hỏi",
                      para:"Bạn không muốn tạo một biểu mẫu nhàm chán. Và khán giả của bạn sẽ không trả lời. Thay vào đó, hãy tạo một biểu mẫu—và làm cho mọi người hài lòng.",
                      btn_1:"Làm bài thi",
                      btn_2:"Bắt đầu",
                  }
                }
              },
          }
    });

export default i18n;