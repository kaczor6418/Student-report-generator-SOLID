# SOLID   
 
 ## Co to jest ?

To zbiór pięciu zasad, które definiują, w jaki sposób powinien być budowany, rozwijany i utrzymywany projekt od strony kodu. Korzystając z tych zasad kod,     
który powstanie nie powinien przypominać plątaniny przewodów podłączonych do bomby, która wybuchnie jeżeli usuniemy niewłaściwy przewód.    
    
## Przykładowa aplikacja 

Aby w przystępny sposób zaprezentować dlaczego warto stosować zasady SOLID stworzyłem prostą aplikację, w której zaprezentowałem różnice między kodem, w który nie uwzględniono tych zasad a kodem korzystającym z nich w prawidłowy sposób.  
Przyjmijmy, że tworzymy system przeznaczony dla pracowników uczelni wyższej, który ma być odpowiedzialny za tworzenie raportów na temat wyników studentów oraz komunikacji z nimi.  
    
## S: Single Responsibility Principle(SRP) 

>*Klasy i metody powinny być odpowiedzialne tylko za jedną rzecz oraz powinna istnieć tylko jeden powód aby je zmieniać*    

SRP wymaga, aby klasa miała tylko jeden powód do zmiany. Klasa zgodna z tą zasadą wykonuje tylko kilka powiązanych zadań. Myśląc w ramach SRP, nie trzeba ograniczać się tylko do problemów powiązanych z klasami.   
Zasadę SRP można zastosować także do metod czy modułów, upewniając się, że są odpowiedzialne, tylko za jedną rzecz oraz  że mają tylko jeden powód do zmiany.  
  
**Historyjka:**  
  
Doktor Jan Kowalski zgłosił potrzebę generowania raportów z wynikami jego studentów z różnych grup, oraz możliwości przesyłania tych raportów.  
    
### Złe podejście  

```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    private formatReport(type: ReportType): HTMLElement {
        const formattedReport = document.createElement('table');
        switch (type) {
            case ReportType.DEAN:
                // Logic responsible for generating report for dean  
                break;
            case ReportType.LECTURER:
                // Logic responsible for generating report for lecturer  
                break;
            case ReportType.UNIVERSITY_WORKER:
                // Logic responsible for generating report for university worker  
                break;
            default:
                throw Error('Not supported report type')
        }        // create formatted report  
        return formattedReport;
    }

    public generateAndSendReport(email: string, type: ReportType): Promise<void> {
        const preparedReport: HTMLElement = this.formatReport(type);
        void SaveFileService.saveFile(preparedReport);
        void UniversityEmailService.sendEmail(email, preparedReport);
        return Promise.resolve();
    }
}  
```  
>Kod
  
<p align="center">  
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3enk9PYIM7pEnH61XJx8Xe5hk5gqiN8H9m1BJpr6xYTbImF0lSpJlwUa4yqcpXs9jVid-fv9vSk0FuJFAAjjnJY9Exb2rYenZXOBhjKcplAc1XYcpwxTmhfGw9wXMUGnD70gsmIDjo03-eLmFVehrE=w978-h452-no" alt="StudentsServiceBadUNL"/>  
</p>  
  
>Diagram UML
  
Powyższa klasa nie stosuje zasad SOLID i ma parę błędów, które poniżej wypunktuję:  
 - ```generateReport``` → nie jest odpowiedzialny tylko za generowanie raportów, ale również za automatyczne wysyłanie tych raportów e-mailem. Jest to słabe rozwiązanie, ponieważ, jeżeli osoba generująca raportu ustawi sobie jakąś regułę, która będzie automatycznie generować raport dla wszystkich grup studentów (powiedzmy cyklicznie codziennie), wtedy prawdopodobnie zawalimy komuś skrzynkę, a może nawet wyślemy dane, które nie powinny być wysłane.  
  
### Dobre podejście  

```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private formatReport(type: ReportType): HTMLElement {
        const formattedReport = document.createElement('table');
        switch (type) {
            case ReportType.DEAN:
                // Logic responsible for generating report for dean  
                break;
            case ReportType.LECTURER:
                // Logic responsible for generating report for lecturer  
                break;
            case ReportType.UNIVERSITY_WORKER:
                // Logic responsible for generating report for university worker  
                break;
            default:
                throw Error('Not supported report type')
        }        // create formatted report  
        return formattedReport;
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    public getReport(type: ReportType): HTMLElement {
        return this.formatReport(type);
    }
}

const studentsReport: StudentsReport = new StudentsReport([]);
const report: HTMLElement = studentsReport.getReport(ReportType.DEAN);
void GenerateReportService.generateReport('./path', report);
void UniversityEmailService.sendEmail('test@test.pl', report);  
```  
>Kod
  
<p align="center">  
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3dbx9-v_6iKPjbEM_xo1spz1gz337peoTMsVN0_CpKU948AbBrzD0r6rbrWuFgCm-1o_DXGcg7yChZPxYqPN4yWnPE3BWmPAgyhiIgM6fvuL_Mo1yEdFDzqhKxfyP8tM4SoFn9h8TMb3WIglGyL2pM=w874-h412-no" alt="StudentsServiceGoodUNL"/>  
</p>  
  
>Diagram UML
  
Po refaktoryzacji możemy zauważyć, że **StudentsReport** odpowiada w tym momencie tylko za utworzenie odpowiednio sformatowanego raportu, który zostanie utworzony przez jeden z formaterów. Może i metoda odpowiadająca za formatowanie składa się z wielu ifów, ale odpowiada tylko za jedną rzecz, mianowicie formatowanie raportu. Generowanie raportu na dysk oraz wysyłanie raportu jest realizowane przez dwie niezależne od siebie klasy. Takie klasy są teraz odpowiedzialne tylko za jedną rzecz oraz mają tylko jeden powód do zmiany  
  
## O: Open-Closed Principle(OCP) 

>*Elementy oprogramowania powinny być otwarte na rozszerzanie ale zamknięte na modyfikacje*    

Ryzyko zmiany istniejącej klasy polega na tym, że możemy nieumyślnie wprowadzić zmianę w logice oraz zachowaniu klasy. Rozwiązaniem tego problemu jest stworzenie klasy,    
która przesłoni logikę działania oryginalnej klasy. Wykorzystując tę zasadę, będzie znacznie łatwiej utrzymywać napisany kod (nieoczekiwane zmiany w logice, bugi...) oraz reużywać  już raz stworzonego kodu.    

### Złe podejscie
```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private formatReport(type: ReportType): HTMLElement {
        const formattedReport = document.createElement('table');
        switch (type) {
            case ReportType.DEAN:
                // Logic responsible for generating report for dean  
                break;
            case ReportType.LECTURER:
                // Logic responsible for generating report for lecturer  
                break;
            case ReportType.UNIVERSITY_WORKER:
                // Logic responsible for generating report for university worker  
                break;
            default:
                throw Error('Not supported report type')
        }        // create formatted report  
        return formattedReport;
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    public getReport(type: ReportType): HTMLElement {
        return this.formatReport(type);
    }
}
```
>Kod

<p align="center">  
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3fVMjoYFjKMSZkB5LyF_myvg80NCxUYcJyjdlXWRa9gbiW3UoneiT_SiV-7WIA9UxFulmJf8ih1r_SRooTFhpjgH8Vap0j_YpdD3h2zMuwPYwNyyVLZQQD250FDDWCmPIT_GcQxRPoWL2b8__5t71Ii=w512-h412-no" alt="StudentsServiceGoodUNL"/>  
</p>  
  
>Diagram UML

Podejście to ma parę wad, które wymienię poniżej:  
 - ```formatReport``` → formatuje raport w zależności, dla kogo ma być on stworzony. Co w wypadku gdy będziemy chcieli dodać raport dla studenta lub innych użytkowników? Funkcja wraz z całą klasą urośnie, do ogromnych rozmiarów, co przyczyni się do tego, że kod będzie trudny w czytaniu, ciężko będzie się go utrzymywać i testować.  Ponadto zmiany w tej jednej funkcji, mogą mieć wpływ na całą klasę, z czym wiąże się prawdopodobne wygenerowanie błędów.

### Dobre podejście  

```typescript  
class StudentsReport {
    private report: Map<number, Student> = new Map<number, Student>();

    constructor(students: StudentData[]) {
        this.createReport(students);
    }

    private createReport(students: StudentData[]): void {
        // create report logic  
    }

    public getReport(type: ReportType): HTMLElement {
        const reportFormatter: AbstractReportFormatterService = ReportFormatterServiceFactory.getReportFormatter(type);
        return reportFormatter.formatReport();
    }
}  
  
class ReportFormatterServiceFactory {
    public static getReportFormatter(type: ReportType): DeanReportFormatterService | LecturerReportFormatterService | UniversityWorkerReportFormatterService {
        let formatterService: DeanReportFormatterService | LecturerReportFormatterService | UniversityWorkerReportFormatterService;
        switch (type) {
            case ReportType.DEAN:
                formatterService = new DeanReportFormatterService();
                break;
            case ReportType.LECTURER:
                formatterService = new LecturerReportFormatterService();
                break;
            case ReportType.UNIVERSITY_WORKER:
                formatterService = new UniversityWorkerReportFormatterService();
                break;
            default:
                throw Error('Not supported report type')
        }
        return formatterService;
    }
}
```
>Kod

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3e6n6dt4TLDmTHikp1tR0kG9XIP-S8cS1GwRTWLulXxjJa8Rj1YDFSSAlW44m2e4ehL8eXM7YUz2R6PzUabGLbUSuR_RUb-EEcb8-mLb3wRQq20KUbIW5PvZQJoEcsHsX4rxktUckpPVJQryXwQy9_4=w1123-h452-no" alt="StudentsServiceGoodUNL"/> 
</p>   

>Diagram UML  
  
Każdy formatter otrzymał swoją własną klasę, dzięki czemu jeżeli powstanie jakiś nowy typ użytkownika to wystarczy dla niego utworzyć nową klasę i dodać przypadek w fabryce.

## L: Liskov Substitution Principle (LSP) 

>*Klasy potomne nigdy nie powinny łamać definicji typów klas nadrzędnych*    

Klasa dziedzicząca z klasy podstawowej powinna jedynie rozszerzać funkcjonalność (subklasa nie powinna modyfikować zachowania klasy podstawowej np.: ilość przyjmowanych argumentów konstruktora / funkcji) klasy bazowej oraz zwracać ten sam typ danych. Oznacza to, że w miejscu klasy bazowej powinniśmy być w stanie skorzystać z dowolnej klasy po niej dziedziczącej.    
 
### Złe podejście

```typescript
class ReportFormatterServiceFactory {
    public static getReportFormatter(type: ReportType): DeanReportFormatterService | LecturerReportFormatterService | UniversityWorkerReportFormatterService {
        let formatterService: DeanReportFormatterService | LecturerReportFormatterService | UniversityWorkerReportFormatterService;
        switch (type) {
            case ReportType.DEAN:
                formatterService = new DeanReportFormatterService();
                break;
            case ReportType.LECTURER:
                formatterService = new LecturerReportFormatterService();
                break;
            case ReportType.UNIVERSITY_WORKER:
                formatterService = new UniversityWorkerReportFormatterService();
                break;
            default:
                throw Error('Not supported report type')
        }
        return formatterService;
    }
}
```
>Kod

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3e6n6dt4TLDmTHikp1tR0kG9XIP-S8cS1GwRTWLulXxjJa8Rj1YDFSSAlW44m2e4ehL8eXM7YUz2R6PzUabGLbUSuR_RUb-EEcb8-mLb3wRQq20KUbIW5PvZQJoEcsHsX4rxktUckpPVJQryXwQy9_4=w1123-h452-no" alt="StudentsServiceGoodUNL"/> 
</p>  

>Diagram UML

Po przeanalizowaniu kodu możemy zauważyć, że każdy z formatterów ma swój osobny typ i nie są ze sobą powiązane, czyli nie możemy skorzystać z innego formattera w miejscu, w którym już na jakiś się zdecydowaliśmy

### Dobre podejście

```typescript
class ReportFormatterServiceFactory {
    public static getReportFormatter(type: ReportType, report: Map<number, Student>): IHandleFormatterService {
        let formatterService: IHandleFormatterService;
        switch (type) {
            case ReportType.DEAN:
                formatterService = new DeanReportFormatterService(report);
                break;
            case ReportType.LECTURER:
                formatterService = new LecturerReportFormatterService(report);
                break;
            case ReportType.UNIVERSITY_WORKER:
                formatterService = new UniversityWorkerReportFormatterService(report);
                break;
            default:
                throw Error('Not supported report type')
        }
        return formatterService;
    }
}

abstract class AbstractReportFormatterService implements IHandleFormatterService {
    private report: Map<number, Student>;

    public abstract formatReport(): HTMLElement;

    constructor(report: Map<number, Student>) {
        this.report = report;
    }
}

class DeanReportFormatterService extends AbstractReportFormatterService implements IHandleFormatterService {
    public formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }
}
```
>Kod

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3f0DDgqKsStvsPfpogT6XjXgvJlPAZGxCO6ro_6WAYJouCTE_OYi34wua-BugbR_TfEuJPbre0Ry8zD4YpBaz5V4zwsRhIYVGiwI8jOKRiAVbj5Q9vedBp5fnapxjXA8qbpeLuWJdKL4U2HL7so1zvL=w1464-h532-no" alt="StudentsServiceGoodUNL"/> 
</p> 

>Diagram UML

Utworzona wspólna klasa abstrakcyjna, w której można zawrzeć powtarzającą się logikę oraz dodatkowo zapewniliśmy, to każdy formatter może być podmieniony przez inny, który także dziedziczy po **AbstractReportFormatterService**
    
## I: Interface Segregation Principle (ISP)

>*Użytkownik nie powinien musieć polegać na interfejsacg, których nie używa*   
 
Często jest tak, że interfejs jest opisem całej klasy. ISP to zasada, która mówi, że klasa powinna być opisana szeregiem mniejszych interfejsów (bardziej szczegółowych odpowiedzialnych tylko za jedną rzecz SRP),     
które udostępniają tylko niektóre zasoby klasy zamiast całej jej zawartości w jednym miejscu.

**Historyjka:** 

Doktor Jan Kowalski zgłosił potrzebę aktualizacji raportów dla pojedynczych studentów oraz grup.

### Złe podejście

```typescript
interface IHandleFormatterService {
    formatReport(): HTMLElement;
    updateReport(indexes: number[]): void;
}

abstract class AbstractReportFormatterService implements IHandleFormatterService{
    private report: Map<number, Student>;

    protected formattedReport: HTMLElement;

    public abstract formatReport(): HTMLElement;
    public abstract updateReport(indexes: number[]): void;

    constructor(report: Map<number, Student>) {
        this.report = report;
    }
}

class UniversityWorkerReportFormatterService extends AbstractReportFormatterService implements IHandleFormatterService {
    public formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }

    public updateReport(indexes: number[]): void {
        // update report logic
    }
}
```
>Kod

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3fjSIIyUVdgPTJIlJ77XIv9v0P0oUtQFr3-4wc0SG3HtyCq6ReZjBx80einuEtJ-_ghg7AApLG-fJJiTkFX7ps_GIpx_INbQJFtS93HlFrHaukxscBq10mlTE5kCPyGULFtnE8FPY8IHx47xEHKKXK6=w751-h412-no" alt="StudentsServiceGoodUNL"/> 
</p> 

>Diagram UML

Nie powinniśmy rozszerzać głównego interfejsu, z którego korzysta każda grupa użytkowników, ponieważ:  
 - Za każdym razem gdy dołożymy kolejny element do interfejsu ```IHandleFormatterService```, będziemy musieli go zaimplementować w każdej klasie, która go implementuje (co najwyżej jeżeli będzie to element opcjonalny), a niekoniecznie go potrzebuje
 - ```updateReport``` nie powinno być dostępnie dla pani sekretarki, które pracuje na uczelni, ponieważ nie powinna ingerować w raporty studentów podległych jakiemuś doktorow
 ### Dobre podejście
 
 ```typescript
type IHandleFormatterService = IDeanFormatterService | ILecturerFormatterService | IUniversityWorkerService;
interface IBaseFormatterService {
    formatReport(): HTMLElement;
}
interface IDeanFormatterService extends IBaseFormatterService { }
interface ILecturerFormatterService extends IBaseFormatterService {
    updateReport(indexes: number[]): void;
}
interface IUniversityWorkerService extends IBaseFormatterService { }

abstract class AbstractReportFormatterService implements IBaseFormatterService {
    private report: Map<number, Student>;

    protected formattedReport: HTMLElement;

    public abstract formatReport(): HTMLElement;

    constructor(report: Map<number, Student>) {
        this.report = report;
    }
}

export class LecturerReportFormatterService extends AbstractReportFormatterService implements ILecturerFormatterService {
    public formatReport(): HTMLElement {
        const formattedReport: HTMLElement = document.createElement('table');
        // Report formatting logic
        return formattedReport;
    }


    public updateReport(indexes: number[]): void {
        // Update report logic
    }
}
```
>Kod

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3e4z9hbOEQ-69q_Mtg8D9XmlY3XMAvKpAgPI70ks6mVKl1JsxGErEtE49NKDFc46Vp_iNsy3MuQGUPuEkgExxz1UEE-aqVPL-8b5npCSvmpcfw_LomzS69gQ9Q-ifIhK9wuqnDs49vqFEwXI2dhQJAr=w751-h412-no" alt="StudentsServiceGoodUNL"/> 
</p> 

>Diagram UML

Interfejs ```IHandleFormatterService``` stał się typem union, który jest zbiorem interfejsów. Każdy typ użytkownika ma swój własny interfejs, dzięki czemu jeżeli trzeba dołożyć jakąś funkcjonalność / pole dla tylko jednej grupy użytkowników to wystarczy zrobić to tylko dla nich, a nie dla wszystkich. Dodatkowo wyodrębniliśmy wspólny interfejs, który zawiera deklarację implementacji metody ```formatReport```, która jest wspólna dla wszystkich typów użytkowników i każdy musi ją zaimplementować.

## D: Dependency Inversion Principle (DIP)

>*Abstrakcja nie powinna zależeć od detali. Detale powinny zależeć od abstrakcji*   
 
Abstrakcja lub moduł niższego poziomu nie powinien być zależny od klas czy modułów wyższego poziomu, ponieważ zmiany, które będą wymagane do wprowadzenia w bardziej wysokopoziomowej klasie prawdopodbnie    
będą miały wpływ na niskopoziomową klasę / moduł, przez co wymagane będą zmiany w klasach / modułach, które korzystają te bardziej niskopoziomową

**Historyjka:**  

Dziekan uczelni podpisał kontrakt z Microsoft na dostarczenie serwisu mailingowego. Musieliśmy stworzyć nowy serwis mailingowy, po czym okazało się, że zerwał kontrakt z Microsoft i podpisał kontrakt z Amazon. Wymusiło to, że znowu trzeba zmienić serwis odpowiedzialny za wysłanie wiadomości email. Po paru miesiącach dziekan dostał ofertę od Google i ją przyjął oraz zerwał kontrakt z Amazon. Po raz kolejny musimy zmienić nas serwis mailingowy.

### Złe podejście

```typescript
class UniversityEmailService {
    public sendEmail(email: string, data: unknown): Promise<void> {
        // Send University email logic
        return Promise.resolve();
    }
}

class AzureEmailService {
    public sendEmail(email: string, data: unknown): Promise<void> {
        // Send Azure email logic
        return Promise.resolve();
    }
}

class AmazonEmailService {
    public sendEmail(email: string, data: unknown): Promise<void> {
        // Send Amazon email logic
        return Promise.resolve();
    }
}

class GoogleEmailService {
    public sendEmail(email: string, data: unknown): Promise<void> {
        // Send Google email logic
        return Promise.resolve();
    }
}
```
>Code

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3cac5Db6GYbH0zkkVcVH6pgAEfH7_aGGN0LpCXGiXc6Z92FhdXttqPceH89OOgINqX6r8OPtMGZvcgHraqgCdYFt0vBL95EsinLdDV1e6tISve-95K1umDbsrIrvuTWvQdSI0UVPC-PNxNbC_VoqId9=w440-h338-no" alt="StudentsServiceGoodUNL"/> 
</p> 

>Diagram UML

Podejście to jest złe, ponieważ za każdym razem musimy zmieniać serwis odpowiedzialny za wysyłanie emaili.

### Dobre podejście

```typescript
type IHandleEmailService = IAzureEmailService | IAmazonEmailService | IGoogleEmailService;
interface IBaseEmailService {
    sendEmail(email: string): Promise<void>;
}
interface IAzureEmailService extends IBaseEmailService { }
interface IAmazonEmailService extends IBaseEmailService { }
interface IGoogleEmailService extends IBaseEmailService { }

abstract class AbstractEmailService implements IBaseEmailService {
    protected data: unknown;

    public abstract sendEmail(): Promise<void>;

    constructor(data: unknown) {
        this.data = data;
    }
}

class GoogleEmailService extends AbstractEmailService implements IGoogleEmailService {
    public sendEmail(email: string): Promise<void> {
        // Send email logic
        return Promise.resolve();
    }
}
```

<p align="center">    
 <img src="https://lh3.googleusercontent.com/pw/ACtC-3eYYYKzOfvoqwXm_e3JyAKZRqHv6UbxPv167tTPm8hsO9B2KaYTZ-6mzlSpFCdgeAK_D__WxPG9RpM4Qp9kdaUOU7ECYOObWLLFJnYV2AU2cuaYp4dSV82oPnMwEE0cbfFMLtBwK1dXb2nwG1g7uRc-=w618-h412-no" alt="StudentsServiceGoodUNL"/> 
</p> 

>Diagram UML

W tym podejściu została wyodrębniona klasa abstrakcyjna, po której dziedziczy każdy unikalny serwis do wysyłania emaili. Dzięki temu rozwiązaniu można rozwiązać problem zależności modułu wyższego poziomu, od modułu niższego poziomu. Dodatkowo nie będzie potrzeby modyfikowania funkcjonalności odpowiedzialnej za wysyłanie emaili, wystarczy, że zmienimy serwis, z którego korzystamy.


> Repozytorium wraz z kodem można znaleźć [**tutaj**](https://github.com/kaczor6418/SOLID)
