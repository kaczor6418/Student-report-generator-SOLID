# SOLID  
  
## Co to jest ?  
To zbiór pięciu zasad, które definiją, w jaki sposób powinien być budowany, rozwijany i utrzymywany projekt od strony kodu. Korzystając z tych zasad kod,   
który powstanie nie powinien przypominać plątaniny przewodów podłączonych do bomby, która wybuchnie jeżeli usuniemy niewłaściwy przewód.  
  
## Przykładowa aplikacja  
Aby w przystępny sposób zaprezentować dlaczego warto stosować zasady SOLID stworzyłem prostą aplikację   
  
## S: Single Responsibility Principle(SRP)  
>*Klasy i metody powinny być odpowiedzialne tylko za jedną rzecz oraz powinna istnieć tylko jeden powód aby je zmieniać*  
  
SRP wymaga, aby klasa miała tylko jeden powód do zmiany. Klasa zgodna z tą zasadą wykonuje tylko kilka powiązanych zadań. Myśląc w ramach SRP, nie trzeba ograniczać się tylko do problemów powiązanych z klasami. Zasadę SRP można zastosować także do metod czy modułów, upewniając się, że są odpowiedzialne, tylko za jedną rzecz oraz  że mają tylko jeden powód do zmiany.  
  
## O: Open-Closed Principle(OCP)  
>*Elementy oprogramowania powinny być otwarte na rozszerzanie ale zamknięte na modyfikacje*  
  
Ryzyko zmiany istniejącej klasy polega na tym, że możemy nieumyślnie wprowadzić zmianę w logice oraz zachowaniu klasy. Rozwiązaniem tego problemu jest stworzenie klasy,  
która przesłoni logikę działania oryginalnej klasy. Wykorzystując tę zasadę, będzie znacznie łatwiej utrzymywać napisany kod (nieoczekiwane zmiany w logice, bugi...) oraz reużywać  już raz stworzonego kodu.  
  
## L: Liskov Substitution Principle (LSP)  
>*Klasy potomne nigdy nie powinny łamać definicji typów klas nadrzędnych*  
  
Klasa dziedzicząca z klasy podstawowej powinna jedynie rozszerzać funkcjonalność (subklasa nie powinna modyfikować zachowania klasy podstawowej np.: ilość przyjmowanych argumentów konstruktora / funkcji) klasy bazowej oraz zwracać ten sam typ danych. Oznacza to, że w miejscu klasy bazowej powinniśmy być w stanie skorzystać z dowolnej klasy po niej dziedziczącej.  
  
## I: Interface Segregation Principle (ISP)  
>*Użytkownik nie powinien musieć polegać na interfejsacg, których nie używa*  
  
Często jest tak, że interfejs jest opisem całej klasy. ISP to zasada, która mówi, że klasa powinna być opisana szeregiem mniejszych interfejsów (bardziej szczegółowych odpowiedzialnych tylko za jedną rzecz SRP),   
które udostępniają tylko niektóre zasoby klasy zamiast całej jej zawartości w jednym miejscu.  
  
## D: Dependency Inversion Principle (DIP)  
>*Abstrakcja nie powinna zależeć od detali. Detale powinny zależeć od abstrakcji*  
  
Abstrakcja lub moduł niższego poziomu nie powinien być zależny od klas czy modułów wyższego poziomu, ponieważ zmiany, które będą wymagane do wprowadzenia w bardziej wysokopoziomowej klasie prawdopodbnie  
będą miały wpływ na niskopoziomową klasę / moduł, przez co wymagane będą zmiany w klasach / modułach, które korzystają te bardziej niskopoziomową
