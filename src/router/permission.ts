import router from './index'
import useStore from '@/stores/index'


const whileList = ['/login']
router.beforeEach((to,from,next) => {
    const {app} = useStore();
    
    if(app.token){
        if(to.path === '/login'){
            console.log('通过');
            
            next('/');
        }else{
            next();
        }
    }else{
        if(whileList.includes(to.path)){
            next();
        }else{
            next('/login');
        }
    }
})