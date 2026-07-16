export function authorize(...allowedRoles) {

    return (req, res, next) => {

        try {

            if (!req.user || !req.user.role) {

                return res.status(401).json({

                    success: false,
                    message: "Unauthorized."

                });

            }

            if (!allowedRoles.includes(req.user.role)) {

                return res.status(403).json({

                    success: false,
                    message: "Access denied."

                });

            }

            next();

        } catch (error) {

            return res.status(500).json({

                success: false,
                message: error.message

            });

        }

    };

}



// આ Node.js/Express Middleware કોડ છે જે **Role-Based Access Control (RBAC)** એટલે કે યુઝરના રોલ (જેમ કે ADMIN, VIEWER વગેરે) મુજબ તેને કોઈ ચોક્કસ પેજ કે API વાપરવાની મંજૂરી આપવાનું કામ કરે છે.

//દરેક લાઈનનો સરળ ગુજરાતીમાં સમજીએ:

//1. **`export function authorize(...allowedRoles) {`**
//* **સમજૂતી:** આ એક ફંક્શન છે જેને આપણે `authorize` નામ આપ્યું છે. બ્રેકેટમાં લખેલું `...allowedRoles` (રેસ્ટ ઓપરેટર) નો અર્થ એ થાય કે તમે આ ફંક્શનમાં એક અથવા એકથી વધુ રોલ મોકલી શકો છો (દા.ત. `authorize('ADMIN', 'ORGANIZER')`). તે બધા જ રોલ્સને એક એરે (લિસ્ટ) બનાવી દેશે જેને કઈ-કઈ મંજૂરી આપવાની છે.


//2. **`return (req, res, next) => {`**
//* **સમજૂતી:** આ લાઈન એક Express Middleware ફંક્શન રિટર્ન કરે છે. આ ફંક્શન પાસે `req` (રિક્વેસ્ટ), `res` (રિસ્પોન્સ), અને `next` (આગળ વધવા માટેનું ફંક્શન) નો એક્સેસ હોય છે.


//3. **`try {`**
//* **સમજૂતી:** આ લાઈનથી કોડનું ચેકિંગ શરૂ થાય છે. જો અંદરના કોડમાં કંઈપણ ભૂલ (Error) આવશે, તો તે સીધું નીચે આપેલા `catch` બ્લોકમાં મોકલી દેશે જેથી સર્વર ક્રેશ ન થાય.


//4. **`if (!req.user || !req.user.roleId) {`**
//* **સમજૂતી:** અહીં ચેક કરવામાં આવે છે કે: શું યુઝર લોગીન નથી થયેલો? (`!req.user`) અથવા શું યુઝર પાસે કોઈ `roleId` જ નથી? (`!req.user.roleId`).


//5. **`return res.status(401).json({ success: false, message: "Unauthorized." });`**
//* **સમજૂતી:** જો ઉપરની શરત સાચી પડે (એટલે કે યુઝર લોગીન ન હોય કે તેની પાસે રોલ આઈડી ન હોય), તો સર્વર અહીં જ અટકી જશે અને યુઝરને `401 Unauthorized` નો મેસેજ મોકલી દેશે કે "તમે લોગીન કરેલ નથી."


//6. **`if (!allowedRoles.includes(req.user.roleId)) {`**
//* **સમજૂતી:** જો યુઝર લોગીન છે, તો અહીં ચેક થશે કે: યુઝરનો `roleId` એ આપણે મંજૂરી આપેલી લિસ્ટ (`allowedRoles`) માં શામેલ **નથી** ને?


//7. **`return res.status(403).json({ success: false, message: "Access denied." });`**
//* **સમજૂતી:** જો યુઝરનો રોલ મંજૂર કરેલા લિસ્ટમાં ન હોય (દા.ત. આઈડી `VIEWER` નો હોય અને આપણે ફક્ત `ADMIN` ને જ મંજૂરી આપી હોય), તો તેને `403 Forbidden` એરર સાથે "Access denied." નો મેસેજ મળશે કે "તમારી પાસે આ જોવાની સત્તા નથી."


//8. **`next();`**
//* **સમજૂતી:** જો યુઝર લોગીન પણ હોય અને તેનો રોલ પણ સાચો (મંજૂર કરેલ) હોય, તો `next()` રન થશે. આનો અર્થ એ કે બધું બરાબર છે અને રિક્વેસ્ટ હવે આગળના મેઈન કંટ્રોલર (જેમ કે ડેટા બતાવવો કે ડીલીટ કરવો) તરફ જઈ શકે છે.


//9. **`} catch (error) {`**
//  **સમજૂતી:** જો `try` બ્લોકની અંદર રન થતી વખતે અચાનક કોઈ ટેકનિકલ ખામી સર્જાય, તો કંટ્રોલ અહીં આવી જશે.


//10. **`return res.status(500).json({ success: false, message: error.message });`**
//**સમજૂતી:** સર્વરમાં આવેલી કોઈ આંતરિક ભૂલના કિસ્સામાં તે યુઝરને `500 Internal Server Error` કોડ અને જે પણ ભૂલ આવી હશે તેનો મેસેજ સ્ક્રીન પર બતાવી દેશે.