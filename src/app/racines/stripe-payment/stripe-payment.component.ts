import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    OnDestroy,
    Output,
    ViewChild,
} from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayementService } from 'src/app/services/payement.service';
@Component({
    selector: 'app-stripe-payment',
    templateUrl: './stripe-payment.component.html',
    styleUrls: ['./stripe-payment.component.scss'],
})
export class StripePaymentComponent implements OnDestroy, AfterViewInit {

    @ViewChild('cardInfo') cardInfo: ElementRef;
    @Output() finishPayment: EventEmitter<any> = new EventEmitter();

    /* #################################    VARIABLE    ################################## */
    public _totalAmount: number;
    public card: any;
    public cardHandler = this.onChange.bind(this);
    public cardError: string;

    /* #################################    CONSTRUCTOR    ################################## */
    constructor(
        private cd: ChangeDetectorRef,
        private payementApi: PayementService
    ) // @Inject(MAT_DIALOG_DATA) private data: any,
    // private dialogRef: MatDialogRef<StripePaymentComponent>,
    {
        this._totalAmount = 25;
    }

    ngOnDestroy() {
        if (this.card) {
        // We remove event listener here to keep memory clean
        this.card.removeEventListener('change', this.cardHandler);
        this.card.destroy();
        }
    }

    ngAfterViewInit() {
        this.initiateCardElement();
    }

    /* #################################    FUNCTIONS    ################################## */

    initiateCardElement() {
        // Giving a base style here, but most of the style is in scss file
        const cardStyle = {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
            color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
        };
        this.card = elements.create('card', { cardStyle });
        this.card.mount(this.cardInfo.nativeElement);
        this.card.addEventListener('change', this.cardHandler);
    }

    onChange({ error }) {
        if (error) {
        this.cardError = error.message;
        } else {
        this.cardError = null;
        }
        this.cd.detectChanges();
    }

    async createStripeToken() {
        const { token, error } = await stripe.createToken(this.card);
        if (token) {
        this.onSuccess(token);
        } else {
        this.onError(error);
        }
    }

    onSuccess(token) {
        console.log(token.id);
        const body = { prix: this._totalAmount, stripeToken: token.id };

        console.log('Avant payement stripe ... ' );

        this.payementApi.stripePayements(body).subscribe((data) => {
        console.log(['the data', data]);
        this.finishPayment.emit(data);
        console.log('Finalisation payement stripe ...' );
        });
    }

    onError(error) {
        if (error.message) {
        this.cardError = error.message;
        }
    }
}
