//no tocar csm >:v
//recompilar en caso de cambiar o agregar algun parametro
//2h perdidas csm >:v 
module.exports = {
    css: {
      loaderOptions: {
        sass: {
            prependData : `
                @import "@/scss/styles.scss";
                `
          },
        }
    }
};