
        const closeIcon  = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FF5666"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`;

        function createWrapper() {
            const wrapper = document.createElement('div');
            wrapper.classList.add('duda-ext-wrapper');

            return wrapper;
        }

        function getCloseButton() {
            const button = document.createElement('div');
            button.innerHTML = closeIcon;
            button.style.cursor = 'pointer';

            return button;
        }

        function appendBadge (wrapper, ...versions) {
            const imgElem = document.createElement('img');

            wrapper.append(imgElem);

            return (state) => {
                if(typeof state === 'boolean') {
                    imgElem.src = `https://img.shields.io/badge/${state ? versions[0] : versions[1]}`;
                }

                if(typeof state === 'string') {
                    imgElem.src = state;
                }
            }
        }

        function getPublishDate() {
            const regExp = /(PublicationDate: ).*2021/;
            const res = document.head.innerHTML.match(regExp);
            if(res.length) {
                return res[0].replace('PublicationDate: \'','');
            } else {
                return '';
            }
        }

        function getSiteAlias() {
            const regExp = /SiteAlias: '(.*)'/;
            const res = document.head.innerHTML.match(regExp);
            return res?.[1] || '';
        }

        function appendLink(wrapper, url) {
            const a = document.createElement('a');
            a.setAttribute("href",url);
            a.setAttribute("target",'_blank');

            wrapper.append(a);

            return a;
        }

        function render() {
            const div = createWrapper();
            appendBadge(div, 'criticalCss-true-green?style=flat-square&logo=CSS3','criticalCss-false-red?style=flat-square&logo=CSS3')(!!document.getElementById('criticalCss'));
            appendBadge(div, 'customCode-false-green?style=flat-square&logo=JavaScript','customCode-true-red?style=flat-square&logo=JavaScript')(!!document.head.innerHTML.indexOf('hasCustomCode: true'));
            const publishDate = getPublishDate();
            if(publishDate) {
                appendBadge(div)(`https://img.shields.io/badge/published-${publishDate}-9cf?style=flat-square&color=lightgrey`);
            }

               
            const templateId = document.getElementById('dm-outer-wrapper')?.getAttribute('dmtemplateid');
            if(templateId)  appendBadge(div)(`https://img.shields.io/badge/template-${templateId}-9cf?style=flat-square&color=lightgrey`);

            const siteAlias = getSiteAlias();
            if(siteAlias) {
                appendBadge(appendLink(div, `https://admin.duda.co/admin/vaadin/siteinfo/${siteAlias}`))(`https://img.shields.io/badge/exportSite-${siteAlias}-9cf?color=important&style=flat-square`);
            }

            const closeButton = getCloseButton();
            div.append(closeButton);
            closeButton.addEventListener('click', () => {
                div.style.display = 'none';
            });


            document.body.append(div);
        }

        if(!!document.getElementById('dmRoot')) {
            render();
        }

