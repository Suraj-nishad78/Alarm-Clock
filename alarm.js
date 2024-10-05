let hours = document.getElementById('hours')
        let minutes = document.getElementById('minutes')
        let seconds = document.getElementById('seconds')

        let aHours = document.getElementById('a-hours')
        let aMinutes = document.getElementById('a-minutes')
        let aSeconds = document.getElementById('a-seconds')

        let alarmList = document.getElementById('alarm-timer')
        let set = document.getElementById('set')
        
        let CurrentDate = new Date()


        // Digital Clock 
        setInterval(()=>{
            CurrentDate = new Date()

            hour = CurrentDate.getHours()
            hours.textContent = `${hour<10?'0'+hour:hour}`

            min = CurrentDate.getMinutes()
            minutes.textContent = `${min<10?'0'+min:min}`

            sec = CurrentDate.getSeconds()
            seconds.textContent = `${sec<10?'0'+sec:sec}`

            checkAlarm()

        },1000)


        // creating a variable for selected input value
        let h = 23;
        let minSec = 59;

        // creating a for loop inside function so that when ever call the value added to the inside selected tag
        function alarm(time,num){
            for(i=0;i<=num;i++){
                let option = document.createElement('option')
                option.value = `${i<10?'0'+i:i}`;
                option.textContent = `${i<10?'0'+i:i}`;
                time.appendChild(option)
            }
        }
        // calling function each time for creating option inside selected tag 
        alarm(aHours,h)
        alarm(aMinutes,minSec)
        alarm(aSeconds,minSec)

        // Create a variable Store the value of Selected tags
        let sHours;
        let sMin;
        let sSec;

        aHours.addEventListener('change',()=>{
            sHours = aHours.value
        })

        aMinutes.addEventListener('change',()=>{
            sMin = aMinutes.value
        })

        aSeconds.addEventListener('change',()=>{
            sSec = aSeconds.value
        })

        // Create add Event Listener for set alarm Button
        set.addEventListener('click',()=>{

            if(sHours === undefined && sMin === undefined && sSec === undefined){
                alert('Please Select the correct time')
                return
            }

            sHours = sHours || '00'
            sMin = sMin || '00'
            sSec = sSec || '00'


            // Create Variable For Current Hours, Minutes, Seconds 
            let currentHour = CurrentDate.getHours()
            let currentMinute = CurrentDate.getMinutes()
            let currentSeconds = CurrentDate.getSeconds()

            // Convert The Current time & Set Alarm time into Seconds
            let currentTimeInSeconds = currentHour * 3600 + currentMinute * 60 + currentSeconds;
            let currentSetAlarm = parseInt(sHours) * 3600 + parseInt(sMin) * 60 + parseInt(sSec)

            // for create a alarm
            if(currentSetAlarm>currentTimeInSeconds){
                let li = document.createElement('li')
                li.textContent = `${sHours}:${sMin}:${sSec}`
                
                let span = document.createElement('span')
                span.textContent = '❎'
                
                // Add event Listener for span to remove li item
                span.addEventListener('click',removeAlarm)

                // set timeout for when the alarm rings the li item of alarm automatic deleted
                setTimeout(removeAlarm, (currentSetAlarm - currentTimeInSeconds)*1000)
                
                // Function for remove alarm 
                function removeAlarm(){
                    alarmList.removeChild(li)
                    alarmList.removeChild(span)
                }


                alarmList.append(li,span)


                // calling the reset function for reseting the value
                resetSelectedTagValue()
            } else {
                alert("Please select a time that is greater than the current time.")
                resetSelectedTagValue()
            }


        })

        // function for reseting the selected tag value
        function resetSelectedTagValue(){

                aHours.selectedIndex = 0;
                aMinutes.selectedIndex = 0;
                aSeconds.selectedIndex = 0;
    
                sHours = undefined;
                sMin = undefined;
                sSec = undefined;
        }

        // Creating a function for match alarm time to current time 
        function checkAlarm(){
            let current = new Date()
            let currentTime = `${current.getHours()<10?'0'+current.getHours():current.getHours()}:${current.getMinutes()<10?'0'+current.getMinutes():current.getMinutes()}:${current.getSeconds()<10?'0'+current.getSeconds():current.getSeconds()}`

            let alarms = document.querySelectorAll('#alarm-timer li');
            alarms.forEach(alarmPlay=>{
                if(alarmPlay.textContent === currentTime){
                    playSong();
                }
            })
        }


        // variable for audio of alarm & image of alarm
        let audio = document.getElementById('myAudio')
        let alarmImage = document.getElementById('alarm-image')

        // creating a function when alarm time match with current time then alarm tone will play & image of alarm shown
        function playSong(){
            alarmImage.style.display = 'block'
            audio.play()
            setTimeout(()=>{
                alarmImage.style.display = 'none'
                audio.pause()
            },7000)
        }